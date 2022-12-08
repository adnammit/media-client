import type UserListData from '@/dto/userListData'

export default interface AddUserListRequest extends UserListData {
	userId: number
}
