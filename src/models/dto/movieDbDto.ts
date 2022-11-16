import type Genre from '@/models/genre'

// directly maps with results from MovieDb get movie/id
export default interface MovieDbDto {
	title: string
	release_date: Date
	id: number
	imdb_id: string
	genres: Genre[]
	homepage: string
	vote_average: number
	original_language: string
	poster_path: string
	overview: string
	runtime: number
	tagline: string
}
