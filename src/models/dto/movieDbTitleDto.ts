import type Genre from '@/models/genre'

// props shared between TvDto and MovieDto
export default interface TitleDto {
	id: number
	imdb_id: string
	genres: Genre[]
	homepage: string
	vote_average: number
	original_language: string
	poster_path: string
	overview: string
	tagline: string
}
