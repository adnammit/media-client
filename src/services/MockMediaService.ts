import type UserTitleDto from '@/dto/userTitleDto'
import type UserTitleData from '@/dto/userTitleData'
import type AddUserTitleRequest from '@/models/dto/addUserTitleRequest'
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
}

export default new MockMediaService()
