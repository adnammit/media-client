// import User from '@/models/user'
// import Movie from '@/models/movie'
// import Tv from '@/models/tv'
// import UserMedia from '@/models/dto/userMedia'
import type IUser from '@/models/user'
import User from '@/models/user'
import type IMediaService from '@/services/IMediaService'
// import mockData from '@/data.json'

class MockMediaService implements IMediaService {

	public async addUser(user: IUser): Promise<IUser> {
		return new User(user)
	}

	public async getUser(username?: string, email?: string): Promise<IUser> {
		return new User({ username: username ?? 'foo', email: email ?? 'foo@test.com' })
	}

	// public async getUserMovies(userid: number): Promise<UserMedia[]> {
	// 	// const json = require('@/data.json')
	// 	// const userData = mockData.data.find((d: any) => d.Email === 'amandaryman@gmail.com')
	// 	// const userData = {}
	// 	return [] as UserMedia[]
	// }

	// public async addUserMovie(userid: number, movie: Movie): Promise<boolean> {
	// 	return true
	// }

	// public async updateUserMovie(userid: number, movie: Movie): Promise<boolean> {
	// 	return true
	// }

	// public async deleteUserMovie(userid: number, movie: Movie): Promise<boolean> {
	// 	return true
	// }

	// public async getUserTv(userid: number): Promise<UserMedia[]> {
	// 	return [] as UserMedia[]
	// }

	// public async addUserTv(userid: number, tv: Tv): Promise<boolean> {
	// 	return true
	// }

	// public async updateUserTv(userid: number, tv: Tv): Promise<boolean> {
	// 	return true
	// }

	// public async deleteUserTv(userid: number, tv: Tv): Promise<boolean> {
	// 	return true
	// }
}

export default new MockMediaService()
