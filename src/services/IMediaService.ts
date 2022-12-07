import type UserTitleDto from '@/dto/userTitleDto'
import type UserTitleData from '@/dto/userTitleData'
import type MediaList from '@/models/mediaList'
import type AddUserTitleRequest from '@/dto/addUserTitleRequest'
import type AddUserListRequest from '@/dto/addUserListRequest'
import type { IUser, IUserInput } from '@/models/user'

export default interface IMediaService {
	addUser(user: IUserInput): Promise<IUser>
	getUser(username?: string, email?: string): Promise<IUser | null>
	getUserTitles(userId: number): Promise<UserTitleDto[]>
	addUserTitle(req: AddUserTitleRequest): Promise<boolean>
	updateUserTitle(userId: number, titleId: number, req: UserTitleData): Promise<boolean>
	deleteUserTitle(userId: number, titleId: number): Promise<boolean>
	getUserLists(userId: number): Promise<MediaList[]>
	addUserList(req: AddUserListRequest): Promise<boolean>
}
