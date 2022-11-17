import type TitleDto from '@/dto/movieDbTitleDto'

// directly maps with results from MovieDb get movie/id
export default interface MovieDto extends TitleDto {
	title: string
	release_date: Date
	runtime: number
}
