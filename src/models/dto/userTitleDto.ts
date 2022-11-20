import type UserTitleData from './userTitleData'

// maps to userData retrieved from mediaService
export default interface UserTitleDto extends UserTitleData {
	userid: number
	titleid: number
	moviedbid: number
	imdbid: string
	mediatype: string

	// rating: number
	// watched: boolean
	// favorite: boolean
	// queued: boolean
}
