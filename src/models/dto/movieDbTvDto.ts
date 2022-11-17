import type TitleDto from '@/dto/movieDbTitleDto'

// directly maps with results from MovieDb get tv/id
export default interface TvDto extends TitleDto {
	name: string
	first_air_date: Date
	episode_run_time: number
	number_of_seasons: number
}
