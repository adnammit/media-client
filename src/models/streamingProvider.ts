import type StreamingAvailabilityDto from '@/dto/streamingAvailabilityDto'
import type { StreamingProvider } from '@/helpers/streamers'

export default interface StreamingInfo extends StreamingAvailabilityDto {
	provider: StreamingProvider
}