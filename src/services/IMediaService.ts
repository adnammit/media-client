import type UserTitleDto from '@/dto/userTitleDto'
import type UserTitleRequest from '@/dto/userTitleRequest'
import type { IUser, IUserInput } from '@/models/user'
export default interface IMediaService {
	addUser(user: IUserInput): Promise<IUser>
	getUser(username?: string, email?: string): Promise<IUser | null>
	getUserTitles(userid: number): Promise<UserTitleDto[]>
	addUserTitle(req: UserTitleRequest): Promise<boolean> {

	// addUserMovie(userid: number, movie: Movie): Promise<boolean>
	// updateUserMovie(userid: number, movie: Movie): Promise<boolean>
	// deleteUserMovie(userid: number, movie: Movie): Promise<boolean>
	// getUserTv(userid: number): Promise<UserMedia[]>
	// addUserTv(userid: number, tv: Tv): Promise<boolean>
	// updateUserTv(userid: number, tv: Tv): Promise<boolean>
	// deleteUserTv(userid: number, tv: Tv): Promise<boolean>
}
