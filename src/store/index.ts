import { defineStore } from 'pinia'
import type IUser from '@/models/user'
import type Title from '@/models/title'
// import type { FeedItem } from '@/models/feedItem'
// import feedData from '@/store/feed.json'
import MovieDbApi from '@/services/MovieDbApi'
import MediaProvider from '@/services/MediaProvider'

type ErrorState = {
	isError: boolean,
	message: string
}

export type RootState = {
	user: IUser | null,
	isLoading: boolean,
	noData: boolean,
	error: ErrorState,
	collection: Title[] //FeedItem[]
}

export const useMainStore = defineStore('main', {

	state: () => ({
		user: null,
		isLoading: false,
		noData: false,
		error: { isError: false, message: '' },
		collection: []
	} as RootState),

	actions: {

		async login(user: IUser) {
			this.error = { isError: false, message: '' }
			this.user = user
			this.loadCollection()
		},

		async logout() {
			this.user = null
			this.unloadCollection()
			this.$router.push({ path: '/' })
		},

		async loadCollection() {
			this.isLoading = true

			// // test loading
			// function timeout(ms: any) {
			// 	return new Promise(resolve => setTimeout(resolve, ms));
			// }
			// await timeout(5000)

			// // test search
			// await MovieDbApi.search('batman')


			MediaProvider.getUserTitles(this.user?.id ?? 0)
				.then((res: Title[]) => {
					this.collection = res
					this.noData = (res.length == 0)

					console.log('>> got this data')
					console.log(res);
				})
				.catch((e: any) => {
					console.error(e);
					this.error = { isError: true, message: 'Error fetching user collection' }
				})
				.finally(() => {
					this.isLoading = false
				});


			// this.collection = feedData.map((d: any) => {
			// 	return {
			// 		id: d.id as number,
			// 		subject: d.subject,
			// 		title: d.title,
			// 		author: d.author,
			// 		text: d.text,
			// 		publishDate: d.publishDate,
			// 		imgUrl: d.imgUrl
			// 	} as FeedItem
			// })
		},

		unloadCollection() {
			this.collection = []
		},
	},

	getters: {
		username: (state: RootState): string => state.user?.username ?? '',
		fullName: (state: RootState): string => `${state.user?.firstName} ${state.user?.lastName}` ?? '',
		email: (state: RootState): string => state.user?.email ?? '',
		isAuthenticated: (state: RootState): boolean => (!!state.user?.username),
	}
})

