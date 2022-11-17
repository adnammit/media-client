import axios from 'axios'
import ApiBase from '@/services/ApiBase'
import { MediaType } from '@/models/enum'
import Genre from '@/models/genre'
import type MovieDto from '@/models/dto/movieDbMovieDto'
import type TvDto from '@/models/dto/movieDbTvDto'
import Title from '@/models/title'
import type SearchDto from '@/dto/searchDto'
import type SearchResult from '@/models/searchResult'
import type UserTitleDto from '@/models/dto/userTitleDto'

const url = `${import.meta.env.VITE_MOVIE_DB_URL}`
const token: string = import.meta.env.VITE_MOVIE_DB_TOKEN

const requestMgr = axios.create({
	baseURL: url,
	headers: {
		common: {
			Authorization: 'Bearer ' + token,
		},
	},
})

class MovieDbApi extends ApiBase {
	private movieGenres: Genre[] = []
	private tvGenres: Genre[] = []

	constructor() {
		super()
		this.getMovieGenres()
		this.getTvGenres()
	}

	private async getMovieGenres() {
		requestMgr.get('genre/movie/list')
			.then(res => {
				this.movieGenres = res.data.genres.map((g: any) => new Genre(g))
			})
			.catch(error => {
				this.logError(error)
				throw error // TODO review all catch blocks here and in mediaService and decide if you always want to throw
			})
	}

	private async getTvGenres() {
		requestMgr.get('genre/tv/list')
			.then(res => {
				this.tvGenres = res.data.genres.map((g: any) => new Genre(g))
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async search(search: string): Promise<SearchResult[]> {
		return requestMgr.get('search/multi?query=' + search)
			.then(res => {
				const data = res.data.results
				let results: SearchResult[] = []

				console.log('>> searched: ');
				console.log(res.data);

				// data.forEach((d: SearchDto) => {
				// 	const parsed = this.parseSearchResult(d)
				// 	if (parsed) results.push(parsed)
				// })

				// results = results.sort((a, b) => {
				// 	return a.title.localeCompare(b.title)
				// })

				return results
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	public async getTitle(id: number, mediaType: MediaType): Promise<MovieDto|TvDto> {

		if (mediaType == MediaType.Unknown) {
			throw new Error(`Title id ${id} has unknown media type`)
		}

		const getTitle = (mediaType == MediaType.Movie)
			? this.getMovie(id)
			: this.getTv(id)

		return getTitle
			.then(res => {
				return res
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	private async getMovie(id: number): Promise<MovieDto> {
		return requestMgr.get('movie/' + id)
			.then(res => {
				return res.data as MovieDto
			})
	}

	private async getTv(id: number): Promise<TvDto> {
		// movieDb doesn't return imdbId with default get request so we retrieve that separately :(
		return Promise.all([requestMgr.get(`tv/${id}`), requestMgr.get(`tv/${id}/external_ids`)])
			.then(([tv, ids]) => {
				const tvDto = tv.data as TvDto
				tvDto.imdb_id = ids?.data?.imdb_id
				return tvDto
			})
	}

	// private parseSearchResult(res: SearchDto): SearchResult | undefined {
	// 	if (res.media_type == 'movie' || res.media_type == 'tv') {
	// 		const genres = res.media_type == 'movie' ? this.getGenres(MediaType.Movie, res.genre_ids) : this.getGenres(MediaType.Tv, res.genre_ids)

	// 		// TODO: log unaccounted for genres

	// 		return new SearchResult(res, genres)
	// 	}
	// 	return
	// }

	// private getGenres(type: MediaType, ids: number[]): Genre[] {
	// 	return type == MediaType.Movie ? this.movieGenres.filter(g => ids.includes(g.id)) : type == MediaType.Tv ? this.tvGenres.filter(g => ids.includes(g.id)) : []
	// }
}

export default new MovieDbApi()
