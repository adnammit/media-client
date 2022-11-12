// import axios from 'axios';
// import { MediaType } from '@/models/enum';
// import Movie from '@/models/movie';
// import Tv from '@/models/tv';
// import Genre from '@/models/genre';
// import SearchResult from '@/models/searchResult';
// import MovieDto from '@/models/dto/movieDto';
// import TvDto from '@/models/dto/tvDto';
// import SearchDto from '@/models/dto/searchDto';
// import config from '@/config.json';

// const url: string = config.movieDbUrl;
// const token: string = config.movieDbToken;

// const requestMgr = axios.create({
// 	baseURL: url,
// 	headers: {
// 		common: {
// 			Authorization: 'Bearer ' + token,
// 		},
// 	},
// });

// class MovieDbApi {
// 	private movieGenres: Genre[] = [];
// 	private tvGenres: Genre[] = [];

// 	constructor() {
// 		this.getMovieGenres();
// 		this.getTvGenres();
// 	}

// 	private async getMovieGenres() {
// 		requestMgr.get('genre/movie/list').then(res => {
// 			this.movieGenres = res.data.genres.map((g: any) => new Genre(g));
// 		});
// 	}

// 	private async getTvGenres() {
// 		requestMgr.get('genre/tv/list').then(res => {
// 			this.tvGenres = res.data.genres.map((g: any) => new Genre(g));
// 		});
// 	}

// 	public async search(search: string): Promise<SearchResult[]> {
// 		return requestMgr.get('search/multi?query=' + search).then(res => {
// 			const data = res.data.results;
// 			let results: SearchResult[] = [];

// 			data.forEach((d: SearchDto) => {
// 				const parsed = this.parseSearchResult(d);
// 				if (parsed) results.push(parsed);
// 			});

// 			results = results.sort((a, b) => {
// 				return a.title.localeCompare(b.title);
// 			});

// 			return results;
// 		});
// 	}

// 	public async getMovie(id: number): Promise<Movie> {
// 		return requestMgr.get('movie/' + id).then(res => {
// 			return new Movie(res.data as MovieDto);
// 		});
// 	}

// 	public async getTv(id: number): Promise<Tv> {
// 		return Promise.all([requestMgr.get(`tv/${id}`), requestMgr.get(`tv/${id}/external_ids`)]).then(([tv, ids]) => {
// 			const tvDto = tv.data as TvDto;
// 			tvDto.imdb_id = ids?.data?.imdb_id;
// 			return new Tv(tvDto);
// 		});
// 	}

// 	private parseSearchResult(res: SearchDto): SearchResult | undefined {
// 		if (res.media_type == 'movie' || res.media_type == 'tv') {
// 			const genres = res.media_type == 'movie' ? this.getGenres(MediaType.Movie, res.genre_ids) : this.getGenres(MediaType.Tv, res.genre_ids);

// 			// to-do: log unaccounted for genres

// 			return new SearchResult(res, genres);
// 		}
// 		return;
// 	}

// 	private getGenres(type: MediaType, ids: number[]): Genre[] {
// 		return type == MediaType.Movie ? this.movieGenres.filter(g => ids.includes(g.id)) : type == MediaType.Tv ? this.tvGenres.filter(g => ids.includes(g.id)) : [];
// 	}
// }

// export default new MovieDbApi();
