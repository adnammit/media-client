import type UserListData from '@/dto/userListData'

export default interface UpdateUserListRequest extends UserListData {
	listId: number,
}
