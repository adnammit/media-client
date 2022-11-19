import { defineStore } from 'pinia'
import type IUser from '@/models/user'
import type Title from '@/models/title'
import MediaProvider from '@/services/MediaProvider'
import { useFilterStore } from '@/store/filter'
import { MediaType } from '@/models/enum'
import type SearchResult from '@/models/searchResult'


type ErrorState = {
	isError: boolean,
	message: string
}

export type RootState = {
	user: IUser | null,
	isLoading: boolean,
	error: ErrorState,
	collection: Title[]
}

export const useMainStore = defineStore('main', {

	state: () => ({
		user: null,
		isLoading: false,
		error: { isError: false, message: '' },
		collection: []
	} as RootState),

	actions: {

		login(user: IUser) {
			this.error = { isError: false, message: '' }
			this.user = user
			this.loadCollection()
		},

		logout() {
			this.user = null
			this.unloadCollection()
			this.$router.push({ path: '/' })
		},

		setIsLoading(val: boolean) {
			this.isLoading = val
		},

		setIsErrored(val: boolean, message?: string) {
			this.error = { isError: val, message: message ?? '' }
		},

		async loadCollection() {
			this.isLoading = true

			// // test loading
			// function timeout(ms: any) {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
			// }
			// await timeout(5000)

			MediaProvider.getUserTitles(this.user?.id ?? 0)
				.then((res: Title[]) => {
					this.collection = res
				})
				.catch((e: any) => {
					console.error(e)
					this.error = { isError: true, message: 'Error fetching user collection' }
				})
				.finally(() => {
					this.isLoading = false
				})
		},

		unloadCollection() {
			this.collection = []
		},

		async addUserItem(item: SearchResult) {
			console.log('>> SAVING ' + JSON.stringify(item));
			// MediaProvider.addSearch(1, item)
			// 	.then((res: boolean) => {
			// 		if (res) {
			// 			this.loadCollection()
			// 		} else {
			// 			throw Error('Error saving searched item to user collection ')
			// 		}
			// 	})
			// 	.catch((e: any) => {
			// 		console.log(e)
			// 		this.error = { isError: true, message: 'Error adding item' }
			// 	})
		},
	},
	getters: {
		username: (state: RootState): string => state.user?.username ?? '',
		fullName: (state: RootState): string => `${state.user?.firstName} ${state.user?.lastName}` ?? '',
		email: (state: RootState): string => state.user?.email ?? '',
		isAuthenticated: (state: RootState): boolean => (!!state.user?.username),
		filteredCollection: (state: RootState) => {
			const filterStore = useFilterStore()
			return state.collection
				.filter(m => (filterStore.filterByFavorite ? m.favorite : filterStore.filterByWatched ? !m.watched : filterStore.filterByUpNext ? m.queued : true))
				.filter(i => (filterStore.filterToMovies ? i.mediaType == MediaType.Movie : filterStore.filterToTv ? i.mediaType == MediaType.TV : true))
		},
	}
})

