// // talks to the MovieDbApi and gets info from our third party api
// // gets our app data from the mediaService depending on whether we're testing/mocking or not
import type { IUser, IUserInput } from '@/models/user'
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

	// consider: we could just store all this data in our db to streamline this
	private async populateTitleData(userData: UserTitleDto[]): Promise<Title[]> {
		const titles = []
		for (const userItem of userData) {
			const id = +userItem.moviedbid
			const movieDbDto = await MovieDbApi.getMovie(id)
			const title = new Title(movieDbDto, userItem)
			titles.push(title)
		}
		return titles
	}

	// private async populateTv(userData: UserMedia[]): Promise<Tv[]> {
	// 	const tvs = []
	// 	for (const item of userData) {
	// 		const id: number = +item.moviedbid
	// 		const tv: Tv = await MovieDbApi.getTv(id)

	// 		tv.populateWithUser(item)
	// 		tvs.push(tv)
	// 	}
	// 	return tvs
	// }

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
