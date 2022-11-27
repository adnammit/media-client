import { acceptHMRUpdate, defineStore } from 'pinia'
import { useFilterStore } from '@/store/filter'
import { useMainStore } from '@/store/index'
import { MediaType } from '@/models/enum'
import Title from '@/models/title'
import SearchResult from '@/models/searchResult'
import type UserTitleData from '@/dto/userTitleData'
import type AddUserTitleRequest from '@/dto/addUserTitleRequest'
import MovieDbApi from '@/services/MovieDbApi'
import MediaProvider from '@/services/MediaProvider'

export type CollectionState = {
	searchResults: SearchResult[],
	collection: Title[],
	selectedSearch: SearchResult,
	selectedUserTitle: Title,
	isSearching: boolean
}

export const useCollectionStore = defineStore('collection', {

	state: () => ({
		searchResults: [],
		collection: [],
		selectedSearch: new SearchResult(),
		selectedUserTitle: new Title(),
		selectedItem: new SearchResult(),
		isSearching: false
	} as CollectionState),

	actions: {

		setSelectedSearchItem(val: SearchResult) {
			this.selectedSearch = val
		},

		setSelectedUserTitle(val: Title) {
			this.selectedUserTitle = val
		},

		clearSearchData() {
			this.selectedSearch = new SearchResult()
			this.searchResults = []
		},

		clearUserTitleData() {
			this.selectedUserTitle = new Title()
		},

		async Search(search: string) {

			if (!!search) {
				this.isSearching = true

				MovieDbApi.search(search)
					.then((results: any) => {
						if (results.Error != null) {
							throw Error('Error contacting movie api ' + JSON.stringify(results.Error))
						} else {
							this.searchResults = results
						}
					})
					.catch((e: any) => {
						console.log(e)
					})
					.finally(() => {
						this.isSearching = false
					})
			}
		},

		async loadCollection() {

			const store = useMainStore()
			store.setIsLoading(true)

			const userId = store.userId

			// // test loading
			// function timeout(ms: any) {
			// 	return new Promise(resolve => setTimeout(resolve, ms))
			// }
			// await timeout(5000)

			MediaProvider.getUserTitles(userId ?? 0)
				.then((res: Title[]) => {
					this.collection = res
				})
				.catch((e: any) => {
					console.error(e)
					store.setIsErrored(true, 'Error fetching user collection')
				})
				.finally(() => {
					store.setIsLoading(false)
				})
		},

		unloadCollection() {
			this.collection = []
		},


		async addUserItem(userData: UserTitleData) {

			const store = useMainStore()
			const userId = store.userId

			if (userId < 0) {
				console.error(`Could not create user item for unknown user`)
				store.setIsErrored(true, `Error adding item to collection`)
			} else {

				store.setIsLoading(true)
				const item = this.selectedSearch

				// // test loading
				// function timeout(ms: any) {
				// 	return new Promise(resolve => setTimeout(resolve, ms))
				// }
				// await timeout(5000)

				// fwiw i hate this -- the data that we get from searching is missing imdbid so we need to get the full object and tack it on before storing it
				const dto = await MovieDbApi.getTitle(item.movieDbId, item.mediaType)
					.catch((e: any) => {
						console.log(e)
					})

				if (dto?.imdb_id == null || dto.imdb_id.trim() == '') {
					store.setIsErrored(true, 'Error retrieving MovieDb data for this title')
					store.setIsLoading(false)
					return
				}

				const request = {
					userId: userId,
					movieDbId: item.movieDbId,
					mediaType: item.mediaType,
					imdbId: dto.imdb_id,
					queued: userData.queued,
					favorite: userData.favorite,
					watched: userData.watched,
					rating: userData.rating,
				} as AddUserTitleRequest

				MediaProvider.addSearch(request)
					.then((res: boolean) => {
						if (res) {
							this.loadCollection()
						} else {
							throw Error('Error saving searched item to user collection ')
						}
					})
					.catch((e: any) => {
						console.log(e)
						store.setIsErrored(true, `Error adding item`)
					})
					.finally(() => {
						this.clearSearchData()
						store.setIsLoading(false)
					})
			}
		},

		async updateUserItem(titleId: number, userData: UserTitleData) {

			const store = useMainStore()
			const userId = store.userId

			if (userId < 0 || titleId < 0) {

				console.error(`Could not create user item for unknown ${!!userId && !!titleId ? 'user and title' : !!userId ? 'user' : 'title'}`)
				store.setIsErrored(true, `Error adding item to collection`)

			} else {

				store.setIsLoading(true)

				// // test loading
				// function timeout(ms: any) {
				// 	return new Promise(resolve => setTimeout(resolve, ms))
				// }
				// await timeout(5000)

				MediaProvider.updateUserItem(userId, titleId, userData)
					.then((res: boolean) => {
						if (res) {
							this.loadCollection()
						} else {
							throw Error(`Error updating titleId ${titleId}`)
						}
					})
					.catch((e: any) => {
						console.log(e)
						store.setIsErrored(true, `Error saving updates to title`)
					})
					.finally(() => {
						store.setIsLoading(false)
					})
			}
		},

		async deleteUserItem(titleId: number) {

			const store = useMainStore()
			const userId = store.userId

			if (userId < 0 || titleId < 0) {

				console.error(`Could not create user item for unknown ${!!userId && !!titleId ? 'user and title' : !!userId ? 'user' : 'title'}`)
				store.setIsErrored(true, `Error adding item to collection`)

			} else {

				store.setIsLoading(true)

				// // test loading
				// function timeout(ms: any) {
				// 	return new Promise(resolve => setTimeout(resolve, ms))
				// }
				// await timeout(5000)

				MediaProvider.deleteUserItem(userId, titleId)
					.then((res: boolean) => {
						if (res) {
							this.loadCollection()
						} else {
							throw Error(`Error deleting titleId ${titleId}`)
						}
					})
					.catch((e: any) => {
						console.log(e)
						store.setIsErrored(true, `Error deleting title`)
					})
					.finally(() => {
						store.setIsLoading(false)
					})
			}
		},
	},
	getters: {
		filteredCollection: (state: CollectionState) => {
			const filter = useFilterStore()
			return state.collection
				.filter(m => (filter.filterByFavorite ? m.favorite : filter.filterByWatched ? !m.watched : filter.filterByUpNext ? m.queued : true))
				.filter(i => (filter.filterToMovies ? i.mediaType == MediaType.Movie : filter.filterToTv ? i.mediaType == MediaType.TV : true))
		},
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCollectionStore, import.meta.hot))
}
