// // talks to the MovieDbApi and gets info from our third party api
// // gets our app data from the mediaService depending on whether we're testing/mocking or not
// import { MediaType } from '@/models/enum'
// import UserMedia from '@/models/dto/userMedia'
// import Movie from '@/models/movie'
// import Media from '@/models/media'
// import SearchResult from '@/models/searchResult'
// import Collection from '@/models/collection'
// import MovieDbApi from '@/services/MovieDbApi'
import type IUser from '@/models/user'
import User from '@/models/user'
import type IMediaService from '@/services/IMediaService'
import MediaService from '@/services/MediaService'
import MockMediaService from '@/services/MockMediaService'
// import Tv from '@/models/tv'

class MediaProvider {
	private service: IMediaService

	constructor() {
		this.service = process.env.NODE_ENV === 'testing' ? MockMediaService : MediaService
	}



	public async addUser(user: IUser): Promise<IUser> {
		return await this.service.addUser(user)
	}

	public async getUser(username?: string, email?: string): Promise<IUser | null> {
		return await this.service.getUser(username, email)
	}

	// public async getUserCollection(userid: number): Promise<Collection> {
	// 	const items = await this.getUserMedia(userid)
	// 	return new Collection(userid, items)
	// }

	// private async getUserMedia(userid: number): Promise<Media[]> {
	// 	// this whole thing is kind of gross -- work on doing it better
	// 	return Promise.all([this.service.getUserMovies(userid), this.service.getUserTv(userid)]).then(async ([userMovies, userTv]) => {
	// 		const movies = await this.populateMovies(userMovies)
	// 		const tv = await this.populateTv(userTv)
	// 		return [...movies, ...tv]
	// 	})
	// }

	// private async populateMovies(userData: UserMedia[]): Promise<Movie[]> {
	// 	const movies = []
	// 	for (const item of userData) {
	// 		const id: number = +item.moviedbid
	// 		const movie: Movie = await MovieDbApi.getMovie(id)

	// 		movie.populateWithUser(item)
	// 		movies.push(movie)
	// 	}
	// 	return movies
	// }

	// private async populateTv(userData: UserMedia[]): Promise<Tv[]> {
	// 	const tvs = []
	// 	for (const item of userData) {
	// 		const id: number = +item.moviedbid
	// 		const tv: Tv = await MovieDbApi.getTv(id)

	// 		tv.populateWithUser(item)
	// 		tvs.push(tv)
	// 	}
	// 	return tvs
	// }

	// public async addSearch(userid: number, item: SearchResult): Promise<boolean> {
	// 	return item.mediaType == MediaType.Movie ? this.addSearchAsMovie(userid, item) : this.addSearchAsTv(userid, item)
	// }

	// private async addSearchAsMovie(userid: number, item: SearchResult): Promise<boolean> {
	// 	const movie = await MovieDbApi.getMovie(item.movieDbId)
	// 	return this.service.addUserMovie(userid, movie)
	// }

	// private async addSearchAsTv(userid: number, item: SearchResult): Promise<boolean> {
	// 	const tv = await MovieDbApi.getTv(item.movieDbId)
	// 	return this.service.addUserTv(userid, tv)
	// }

	// public updateUserItem(userid: number, item: Media): Promise<boolean> {
	// 	return item instanceof Movie ? this.service.updateUserMovie(userid, item) : item instanceof Tv ? this.service.updateUserTv(userid, item) : Promise.resolve(false)
	// }

	// public removeFromCollection(userid: number, item: Media): Promise<boolean> {
	// 	return item instanceof Movie ? this.service.deleteUserMovie(userid, item) : item instanceof Tv ? this.service.deleteUserTv(userid, item) : Promise.resolve(false)
	// }
}

export default new MediaProvider()
