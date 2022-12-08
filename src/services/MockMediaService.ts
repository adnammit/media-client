import type UserTitleDto from '@/dto/userTitleDto'
import type UserTitleData from '@/dto/userTitleData'
import type MediaList from '@/models/mediaList'
import type AddUserTitleRequest from '@/dto/addUserTitleRequest'
import type AddUserListRequest from '@/dto/addUserListRequest'
import type UpdateUserListRequest from '@/dto/updateUserListRequest'
import User, { type IUserInput, type IUser } from '@/models/user'
import type IMediaService from '@/services/IMediaService'

class MockMediaService implements IMediaService {

	public async addUser(user: IUserInput): Promise<IUser> {
		return new User({ id: 1, username: user.username, email: user.email })
	}

	public async getUser(username?: string, email?: string): Promise<IUser> {
		return new User({ id: 1, username: username ?? 'foo', email: email ?? 'foo@test.com' })
	}

	public async getUserTitles(userId: number): Promise<UserTitleDto[]> {
		// const json = require('@/data.json')
		// const userData = mockData.data.find((d: any) => d.Email === 'amandaryman@gmail.com')
		// const userData = {}
		return [] as UserTitleDto[]
	}

	public async addUserTitle(req: AddUserTitleRequest): Promise<boolean> {
		return true
	}

	public async updateUserTitle(userId: number, titleId: number, req: UserTitleData): Promise<boolean> {
		return true
	}

	public async deleteUserTitle(userId: number, titleId: number): Promise<boolean> {
		return true
	}

	public async getUserLists(userId: number): Promise<MediaList[]> {
		return [] as MediaList[]
	}

	public async addUserList(req: AddUserListRequest): Promise<boolean> {
		return true
	}

	public async updateUserList(req: UpdateUserListRequest): Promise<boolean> {
		return true
	}

	public async deleteUserList(listId: number): Promise<boolean> {
		return true
	}

	public async addUserListItem(listId: number, titleId: number): Promise<boolean> {
		return true
	}

	public async deleteUserListItem(listId: number, titleId: number): Promise<boolean> {
		return true
	}
}

export default new MockMediaService()
