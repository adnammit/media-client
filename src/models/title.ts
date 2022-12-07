import type UserTitleDto from '@/dto/userTitleDto'
import type MovieDto from '@/dto/movieDbMovieDto'
import type TvDto from '@/dto/movieDbTvDto'
import { MediaType } from '@/models/enum'
import type Genre from '@/models/genre'
import type TitleBase from '@/models/titleBase'

export default class Title implements TitleBase {
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
	public homepage = ''
	public tagline = ''
	public originalLanguage = ''
	public rating = 0
	public watched = false
	public favorite = false
	public queued = false

	constructor() { }

	Populate(titleDto: MovieDto | TvDto, userItem: UserTitleDto) {
		this.id = userItem.titleid
		this.mediaType = userItem.mediatype as MediaType
		this.rating = userItem.rating
		this.watched = userItem.watched
		this.favorite = userItem.favorite
		this.queued = userItem.queued

		this.movieDbId = titleDto ? titleDto.id : NaN
		this.imdbId = titleDto ? titleDto.imdb_id : ''
		this.genres = titleDto ? titleDto.genres : []
		this.popularRating = titleDto?.vote_average
		this.poster = titleDto ? titleDto.poster_path : ''
		this.homepage = titleDto ? titleDto.homepage : ''
		this.tagline = titleDto ? titleDto.tagline : ''
		this.summary = titleDto ? titleDto.overview : ''
		this.originalLanguage = titleDto ? titleDto.original_language : ''

		this.title = this.instanceOfMovie(titleDto) ? titleDto.title : titleDto.name
		this.releaseDate = this.instanceOfMovie(titleDto) ? new Date(titleDto.release_date) : new Date(titleDto.first_air_date)
	}

	instanceOfMovie(data: MovieDto | TvDto): data is MovieDto {
		return 'title' in data;
	}
}
