import axios from 'axios'
import User, { type IUserInput, type IUser } from '@/models/user'
import type UserTitleData from '@/dto/userTitleData'
import type UserTitleDto from '@/dto/userTitleDto'
import type MediaList from '@/models/mediaList'
import type IMediaService from '@/services/IMediaService'
import ApiBase from '@/services/ApiBase'
import type AddUserTitleRequest from '@/dto/addUserTitleRequest'
import type AddUserListRequest from '@/dto/addUserListRequest'
import type UpdateUserListRequest from '@/dto/updateUserListRequest'

const requestMgr = axios.create({
	baseURL: `${import.meta.env.VITE_API_SERVER_URL}/api/v1/`,
})

class MediaService extends ApiBase implements IMediaService {

	public async addUser(user: IUserInput): Promise<IUser> {

		return requestMgr
			.put('users/', {
				username: user.username,
				email: user.email,
				firstname: user.firstName,
				lastname: user.lastName
			})
			.then(res => {
				return this.rawToUser(res.data.data) as IUser
			})
			.catch(error => {
				// TODO: use 409 to tell user "you already exist" maybe, or don't -- seems bad security wise to do that
				// if (error.response.status == 409) {
				// 	return null
				// } else {
				this.logError(error)
				throw error
				// }
			})
	}

	public async getUser(username?: string, email?: string): Promise<IUser | null> {

		return requestMgr.get('users/', { params: { username: username, email: email } })
			.then(res => {
				const raw = res?.data?.data[0]
				return this.rawToUser(raw)
			})
			.catch(error => {
				if (error.response.status == 404) {
					return null
				} else {
					this.logError(error)
					throw error
				}
			})
	}

	public async getUserTitles(userId: number): Promise<UserTitleDto[]> {

		return requestMgr.get('users/' + userId + '/titles')
			.then(res => {
				return res.data.data as UserTitleDto[]
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async addUserTitle(req: AddUserTitleRequest): Promise<boolean> {

		return requestMgr
			.put('users/' + req.userId + '/titles', req)
			.then(res => {
				return res.status === 201
				// TODO this response is 200 if the title already existed
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async updateUserTitle(userId: number, titleId: number, req: UserTitleData): Promise<boolean> {

		return requestMgr
			.put('users/' + userId + '/titles/' + titleId, req)
			.then(res => {
				return res.status === 200
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async deleteUserTitle(userId: number, titleId: number): Promise<boolean> {
		return requestMgr
			.delete('users/' + userId + '/titles/' + titleId)
			.then(res => {
				return res.status === 200
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async getUserLists(userId: number): Promise <MediaList[]> {

		return requestMgr.get('users/' + userId + '/lists')
			.then(res => {
				return res.data.data as MediaList[]
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async addUserList(req: AddUserListRequest): Promise<boolean> {

		return requestMgr
			.put('users/' + req.userId + '/lists', req)
			.then(res => {
				return res.status === 201
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async updateUserList(req: UpdateUserListRequest): Promise<boolean> {
		return requestMgr
			.put('lists/' + req.listId, req)
			.then(res => {
				return res.status === 200
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async deleteUserList(listId: number): Promise<boolean> {
		return requestMgr
			.delete('lists/' + listId)
			.then(res => {
				return res.status === 200
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async addUserListItem(listId: number, titleId: number): Promise<boolean> {
		return requestMgr
			.put('lists/' + listId + '/titles/' + titleId)
			.then(res => {
				return res.status === 200
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async deleteUserListItem(listId: number, titleId: number): Promise<boolean> {
		return requestMgr
			.delete('lists/' + listId + '/titles/' + titleId)
			.then(res => {
				return res.status === 200
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	private rawToUser(raw: any): IUser | null {
		if (!raw || !raw.username || !raw.email) return null
		return new User({ id: raw.userid, username: raw.username, email: raw.email, firstName: raw.firstname, lastName: raw.lastname })
	}
}

export default new MediaService()
