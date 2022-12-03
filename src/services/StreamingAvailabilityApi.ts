import axios from 'axios'
import ApiBase from '@/services/ApiBase'
import { MediaType } from '@/models/enum'
import { streamingProviders } from '@/helpers/streamers'
import type StreamingProvider from '@/models/streamingProvider'
import type StreamingInfo from '@/models/streamingProvider'

const url = `${import.meta.env.VITE_STREAMING_AVAILABILITY_URL}`
const key: string = import.meta.env.VITE_STREAMING_AVAILABILITY_KEY

const requestMgr = axios.create({
	baseURL: url,
	headers: {
		'X-RapidAPI-Key': key,
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
})

class StreamingAvailabilityApi extends ApiBase {

	constructor() {
		super()
	}

	public async getStreamingInfo(id: number, mediaType: MediaType): Promise<StreamingProvider[]> {

		if (mediaType == MediaType.Unknown) {
			throw new Error(`Title id ${id} has unknown media type`)
		}

		const parsedId = `${mediaType.toString()}/${id}`

		// TODO: expand to other countries/languages
		return requestMgr.get('get/basic', { params: { tmdb_id: parsedId, country: 'us', output_language: 'en' } })
			.then(res => {
				const data = this.parseStreamingInfo(res.data?.streamingInfo)
				return data
			})
			.catch(error => {
				this.logError(error)
				throw error
			})
	}

	private parseStreamingInfo(data: object): StreamingInfo[] {

		const infos: StreamingInfo[] = []

		if (!!data) {

			for (const [key, value] of Object.entries(data)) {

				const streamer = streamingProviders.find(s => key == s.provider.toString())
				if (!!streamer) {

					const info = {
						provider: streamer,
						link: value.link,
						added: value.added, // TODO: this is an int -- how to parse this?
						leaving: value.leaving // TODO: this is an int -- how to parse this?
					} as StreamingInfo

					infos.push(info)
				} else {
					console.log(`encountered unknown provider ${key} `)
				}
			}
		}

		return infos
	}


	// private getStreamingPlatforms() {

	// 	requestMgr.get('countries')
	// 		.then(res => {
	// 			const platforms = Object.keys(res.data)
	// 			this.streamingPlatforms = platforms
	// 		})
	// 		.catch(error => {
	// 			this.logError(error)
	// 			throw error
	// 		})
	// }
}

export default new StreamingAvailabilityApi()
