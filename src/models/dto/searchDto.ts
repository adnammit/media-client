// directly maps with results from MovieDb search
export default interface SearchDto {
	// shared
	id: number;
	media_type: string;
	genre_ids: number[];
	vote_average: number;
	poster_path: string;
	overview: string;
	original_language: string;

	// movie
	title: string;
	release_date: Date;

	// tv
	name: string;
	first_air_date: Date;
}
