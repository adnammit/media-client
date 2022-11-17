// // talks to the MovieDbApi and gets info from our third party api
// // gets our app data from the mediaService depending on whether we're testing/mocking or not
import type { IUser, IUserInput } from '@/models/user'
import type { MediaType } from '@/models/enum'
import type UserTitleDto from '@/dto/userTitleDto'
import Title from '@/models/title'
import type IMediaService from '@/services/IMediaService'
import MediaService from '@/services/MediaService'
import MockMediaService from '@/services/MockMediaService'
import MovieDbApi from '@/services/MovieDbApi'

class MediaProvider {
	private service: IMediaService

	constructor() {
		this.service = process.env.NODE_ENV === 'testing' ? MockMediaService : MediaService
	}

	public async addUser(user: IUserInput): Promise<IUser> {
		return await this.service.addUser(user)
	}

	public async getUser(username?: string, email?: string): Promise<IUser | null> {
		return await this.service.getUser(username, email)
	}

	public async getUserTitles(userId: number): Promise<Title[]> {
		return await this.service.getUserTitles(userId).then(async (userTitles) => {
			const titles = await this.populateTitleData(userTitles)
			return titles
		})
	}

	// TODO: this is a performance concern. we could just store all this data in our db and avoid making a bazillion promises but...
	private async populateTitleData(userData: UserTitleDto[]): Promise<Title[]> {
		let titles: Title[] = []

		var promises = userData.map((userItem) => {
			const id = +userItem.moviedbid
			return MovieDbApi.getTitle(id, userItem.mediatype as MediaType)
				.then((res) => {
					titles.push(new Title(res, userItem))
				})
		})

		await Promise.all(promises)
		return titles
	}


	// public async addSearch(userid: number, item: SearchResult): Promise<boolean> {
	// 	return item.mediaType == MediaType.Movie ? this.addSearchAsMovie(userid, item) : this.addSearchAsTv(userid, item)
	// }

	// private async addSearchAsMovie(userid: number, item: SearchResult): Promise<boolean> {
	// 	const movie = await MovieDbApi.getMovie(item.movieDbId)
	// 	return this.service.addUserMovie(userid, movie)
	// }

	// private async addSearchAsTv(userid: number, item: SearchResult): Promise<boolean> {
	// 	const tv = await MovieDbApi.getTv(item.movieDbId)
	// 	return this.service.addUserTv(userid, tv)
	// }

	// public updateUserItem(userid: number, item: Media): Promise<boolean> {
	// 	return item instanceof Movie ? this.service.updateUserMovie(userid, item) : item instanceof Tv ? this.service.updateUserTv(userid, item) : Promise.resolve(false)
	// }

	// public removeFromCollection(userid: number, item: Media): Promise<boolean> {
	// 	return item instanceof Movie ? this.service.deleteUserMovie(userid, item) : item instanceof Tv ? this.service.deleteUserTv(userid, item) : Promise.resolve(false)
	// }
}

export default new MediaProvider()
