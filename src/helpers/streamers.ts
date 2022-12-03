import { StreamingProviderType } from '@/models/enum'

export type StreamingProvider = {
	// icon: string,
	provider: StreamingProviderType,
	name: string
}

export const streamingProviders: StreamingProvider[] = [
	{
		provider: StreamingProviderType.AppleTv,
		name: "Apple TV"
	},
	{
		provider: StreamingProviderType.AmazonPrime,
		name: "Amazon Prime"
	},
	{
		provider: StreamingProviderType.Disney,
		name: "Disney+"
	},
	{
		provider: StreamingProviderType.HBO,
		name: "HBO"
	},
	{
		provider: StreamingProviderType.Hulu,
		name: "Hulu"
	},
	{
		provider: StreamingProviderType.Netflix,
		name: "Netflix"
	},
	{
		provider: StreamingProviderType.Paramount,
		name: "Paramount"
	},
	{
		provider: StreamingProviderType.Peacock,
		name: "Peacock"
	},
	{
		provider: StreamingProviderType.Showtime,
		name: "Showtime"
	},
	{
		provider: StreamingProviderType.Starz,
		name: "Starz"
	},

]