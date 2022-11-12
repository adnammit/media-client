import type IUser from '@/models/user'
// import Movie from '@/models/movie'
// import Tv from '@/models/tv'
// import UserMedia from '@/models/dto/userMedia'

// export default abstract class IMediaService {
// 	abstract async getUsers(): Promise<User[]>
// 	abstract async getUserMovies(userid: number): Promise<UserMedia[]>
// 	abstract async addUserMovie(userid: number, movie: Movie): Promise<boolean>
// 	abstract async updateUserMovie(userid: number, movie: Movie): Promise<boolean>
// 	abstract async deleteUserMovie(userid: number, movie: Movie): Promise<boolean>
// 	abstract async getUserTv(userid: number): Promise<UserMedia[]>
// 	abstract async addUserTv(userid: number, tv: Tv): Promise<boolean>
// 	abstract async updateUserTv(userid: number, tv: Tv): Promise<boolean>
// 	abstract async deleteUserTv(userid: number, tv: Tv): Promise<boolean>
// }

export default interface IMediaService {
	addUser(user: IUser): Promise<IUser>
	getUser(username?: string, email?: string): Promise<IUser | null>
	// getUserMovies(userid: number): Promise<UserMedia[]>
	// addUserMovie(userid: number, movie: Movie): Promise<boolean>
	// updateUserMovie(userid: number, movie: Movie): Promise<boolean>
	// deleteUserMovie(userid: number, movie: Movie): Promise<boolean>
	// getUserTv(userid: number): Promise<UserMedia[]>
	// addUserTv(userid: number, tv: Tv): Promise<boolean>
	// updateUserTv(userid: number, tv: Tv): Promise<boolean>
	// deleteUserTv(userid: number, tv: Tv): Promise<boolean>
}
