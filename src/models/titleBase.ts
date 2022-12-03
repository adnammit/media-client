import { MediaType } from '@/models/enum'
import type Genre from '@/models/genre'

export default class TitleBase {
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
	// public homepage = ''
	// public tagline = ''
	// public originalLanguage = ''
	public rating = 0
	public watched = false
	public favorite = false
	public queued = false
}