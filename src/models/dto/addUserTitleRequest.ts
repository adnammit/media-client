import type { MediaType } from '@/models/enum'
import type UserTitleData from '@/dto/userTitleData'

export default interface AddUserTitleRequest extends UserTitleData {
	userId: number,
	movieDbId: number,
	imdbId: string,
	mediaType: MediaType,
}
