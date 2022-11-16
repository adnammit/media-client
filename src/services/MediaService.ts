import axios from 'axios'
import type IUser from '@/models/user'
import User from '@/models/user'
import type UserTitleDto from '@/dto/userTitleDto'
import type IMediaService from '@/services/IMediaService'

const requestMgr = axios.create({
	baseURL: `${import.meta.env.VITE_API_SERVER_URL}/api/v1/`,
})

class MediaService implements IMediaService {

	public async addUser(user: IUser): Promise<IUser> {

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

				console.log('>> got user ');
				console.log(raw);

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

	// public async addUserMovie(userid: number, movie: Movie): Promise<boolean> {
	// const request: any = {
	// 	movieDbId: movie.movieDbId,
	// 	imdbId: movie.imdbId,
	// 	rating: movie.rating,
	// 	watched: movie.watched,
	// 	favorite: movie.favorite,
	// 	queued: movie.queued,
	// }
	// return requestMgr
	// 	.post('user/' + userid + '/movies', request)
	// 	.then(res => {
	// 		return res.status === 200
	// 	})
	// 	.catch(error => {
	// 		this.logError(error)
	// 		throw error
	// 	})
	// }

	// public async updateUserMovie(userid: number, movie: Movie): Promise<boolean> {
	// 	const request: any = {
	// 		id: movie.id,
	// 		rating: movie.rating,
	// 		watched: movie.watched,
	// 		favorite: movie.favorite,
	// 		queued: movie.queued,
	// 	}
	// 	return requestMgr
	// 		.put('user/' + userid + '/movies', request)
	// 		.then(res => {
	// 			return res.status === 200
	// 		})
	// 		.catch(error => {
	// 			this.logError(error)
	// 			throw error
	// 		})
	// }

	// public async deleteUserMovie(userid: number, movie: Movie): Promise<boolean> {
	// 	return requestMgr
	// 		.delete('user/' + userid + '/movies/' + movie.id)
	// 		.then(res => {
	// 			return res.status === 200
	// 		})
	// 		.catch(error => {
	// 			this.logError(error)
	// 			throw error
	// 		})
	// }

	// public async getUserTv(userid: number): Promise<UserMedia[]> {
	// 	return requestMgr
	// 		.get('user/' + userid + '/tv')
	// 		.then(res => {
	// 			return res.data as UserMedia[]
	// 		})
	// 		.catch(error => {
	// 			this.logError(error)
	// 			throw error
	// 		})
	// }

	// public async addUserTv(userid: number, tv: Tv): Promise<boolean> {
	// 	const request: any = {
	// 		movieDbId: tv.movieDbId,
	// 		imdbId: tv.imdbId,
	// 		rating: tv.rating,
	// 		watched: tv.watched,
	// 		favorite: tv.favorite,
	// 		queued: tv.queued,
	// 	}
	// 	return requestMgr
	// 		.post('user/' + userid + '/tv', request)
	// 		.then(res => {
	// 			return res.status === 200
	// 		})
	// 		.catch(error => {
	// 			this.logError(error)
	// 			throw error
	// 		})
	// }

	// public async updateUserTv(userid: number, tv: Tv): Promise<boolean> {
	// 	const request: any = {
	// 		id: tv.id,
	// 		rating: tv.rating,
	// 		watched: tv.watched,
	// 		favorite: tv.favorite,
	// 		queued: tv.queued,
	// 	}
	// 	return requestMgr
	// 		.put('user/' + userid + '/tv', request)
	// 		.then(res => {
	// 			return res.status === 200
	// 		})
	// 		.catch(error => {
	// 			this.logError(error)
	// 			throw error
	// 		})
	// }

	// public async deleteUserTv(userid: number, tv: Tv): Promise<boolean> {
	// 	return requestMgr
	// 		.delete('user/' + userid + '/tv/' + tv.id)
	// 		.then(res => {
	// 			return res.status === 200
	// 		})
	// 		.catch(error => {
	// 			this.logError(error)
	// 			throw error
	// 		})
	// }

	private rawToUser(raw: any): IUser | null {
		if (!raw || !raw.username || !raw.email) return null
		return new User({ id: raw.userid, username: raw.username, email: raw.email, firstName: raw.firstname, lastName: raw.lastname })
	}

	private logError(error: any) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data)
			console.log(error.response.status)
			console.log(error.response.headers)
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request)
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message)
		}
		console.log(error.config)
	}
}

export default new MediaService()
