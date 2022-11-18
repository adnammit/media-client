import type SearchDto from '@/dto/searchDto'
import type Genre from '@/models/genre'
import { MediaType } from '@/models/enum'
import { formatYear } from '@/filters/format'

export default class SearchResult {
	public title = ''
	public releaseYear = ''
	public movieDbId = 0
	public mediaType = MediaType.Unknown
	public genres: Genre[] = []
	public popularRating: number | null = null
	public poster = ''
	public summary?: string = ''

	constructor(dto: SearchDto, genres: Genre[]) {
		const type = dto.media_type == 'movie' ? MediaType.Movie : dto.media_type == 'tv' ? MediaType.TV : MediaType.Unknown
		const releaseDate = type == MediaType.TV ? dto.first_air_date : dto.release_date

		this.title = type == MediaType.TV ? dto.name : dto.title
		this.releaseYear = formatYear(releaseDate)
		this.movieDbId = dto.id
		this.mediaType = type
		this.genres = genres
		this.popularRating = dto.vote_average
		this.poster = dto.poster_path
		this.summary = dto.overview
	}
}
