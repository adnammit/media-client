import type SearchDto from '@/dto/searchDto'
import type Genre from '@/models/genre'
import { MediaType } from '@/models/enum'
import type TitleBase from '@/models/titleBase'

export default class SearchResult implements TitleBase {
	public title = ''
	public id = 0 // Title pk in our db
	public movieDbId = 0 // id from movieDbApi
	public imdbId = '' // imdb_id from movieDbApi
	public mediaType = MediaType.Unknown
	public genres: Genre[] = []
	public releaseDate = new Date()
	public popularRating?: number
	public poster = ''
	public summary = ''
	public rating = 0
	public watched = false
	public favorite = false
	public queued = false

	constructor() {}

	Populate(dto: SearchDto, genres: Genre[]) {
		const type = dto.media_type == 'movie' ? MediaType.Movie : dto.media_type == 'tv' ? MediaType.TV : MediaType.Unknown

		this.title = type == MediaType.TV ? dto.name : dto.title
		this.releaseDate = type == MediaType.TV ? new Date(dto.first_air_date) : new Date(dto.release_date)
		this.movieDbId = dto.id
		this.mediaType = type
		this.genres = genres
		this.popularRating = dto.vote_average
		this.poster = dto.poster_path
		this.summary = dto.overview
	}
}
