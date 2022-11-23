import type UserTitleDto from '@/dto/userTitleDto'
import type UserTitleData from '@/dto/userTitleData'
import type AddUserTitleRequest from '@/models/dto/addUserTitleRequest'
import type { IUser, IUserInput } from '@/models/user'

export default interface IMediaService {
	addUser(user: IUserInput): Promise<IUser>
	getUser(username?: string, email?: string): Promise<IUser | null>
	getUserTitles(userid: number): Promise<UserTitleDto[]>
	addUserTitle(req: AddUserTitleRequest): Promise<boolean>
	updateUserTitle(userId: number, titleId: number, req: UserTitleData): Promise<boolean>
	// deleteUserMovie(userid: number, movie: Movie): Promise<boolean>
}
