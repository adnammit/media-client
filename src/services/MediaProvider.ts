// talks to the MovieDbApi and gets info from our third party api
// gets our app data from the mediaService depending on whether we're testing/mocking or not
import type { IUser, IUserInput } from '@/models/user'
import type { MediaType } from '@/models/enum'
import type AddUserTitleRequest from '@/dto/addUserTitleRequest'
import type AddUserListRequest from '@/dto/addUserListRequest'
import type UpdateUserListRequest from '@/dto/updateUserListRequest'
import Title from '@/models/title'
import type MediaList from '@/models/mediaList'
import type UserTitleDto from '@/dto/userTitleDto'
import type UserTitleData from '@/dto/userTitleData'
import type IMediaService from '@/services/IMediaService'
import MediaService from '@/services/MediaService'
import MockMediaService from '@/services/MockMediaService'
import MovieDbApi from '@/services/MovieDbApi'

class MediaProvider {
	private service: IMediaService

	constructor() {
		this.service = import.meta.env.NODE_ENV === 'testing' ? MockMediaService : MediaService
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

		const promises = userData.map((userItem) => {
			const id = +userItem.moviedbid
			return MovieDbApi.getTitle(id, userItem.mediatype as MediaType)
				.then((res) => {
					const title = new Title()
					title.Populate(res, userItem)
					titles.push(title)
				})
		})

		await Promise.all(promises)
		return titles
	}

	public async addSearch(request: AddUserTitleRequest): Promise<boolean> {
		return this.service.addUserTitle(request)
	}

	public updateUserItem(userId: number, titleId: number, item: UserTitleData): Promise<boolean> {
		return this.service.updateUserTitle(userId, titleId, item)
	}

	public deleteUserItem(userId: number, titleId: number): Promise<boolean> {
		return this.service.deleteUserTitle(userId, titleId)
	}

	public async getUserLists(userId: number): Promise<MediaList[]> {
		return this.service.getUserLists(userId)
	}

	public async addUserList(req: AddUserListRequest): Promise<boolean> {
		return this.service.addUserList(req)
	}

	public async updateUserList(req: UpdateUserListRequest): Promise<boolean> {
		return this.service.updateUserList(req)
	}

	public async deleteUserList(listId: number): Promise<boolean> {
		return this.service.deleteUserList(listId)
	}

	public async addUserListItem(listId: number, titleId: number): Promise<boolean> {
		return this.service.addUserListItem(listId, titleId)
	}

	public async deleteUserListItem(listId: number, titleId: number): Promise<boolean> {
		return this.service.deleteUserListItem(listId, titleId)
	}
}

export default new MediaProvider()
