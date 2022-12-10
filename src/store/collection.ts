import { acceptHMRUpdate, defineStore } from 'pinia'
import { useFilterStore } from '@/store/filter'
import { useMainStore } from '@/store/index'
import Title from '@/models/title'
import MediaList from '@/models/mediaList'
import SearchResult from '@/models/searchResult'
import type UserTitleData from '@/dto/userTitleData'
import type AddUserTitleRequest from '@/dto/addUserTitleRequest'
import type AddUserListRequest from '@/dto/addUserListRequest'
import type UpdateUserListRequest from '@/dto/updateUserListRequest'
import type UserListData from '@/dto/userListData'
import MovieDbApi from '@/services/MovieDbApi'
import MediaProvider from '@/services/MediaProvider'

export type CollectionState = {
	searchResults: SearchResult[],
	collection: Title[],
	lists: MediaList[],
	selectedSearch: SearchResult,
	selectedUserTitle: Title,
	selectedList: MediaList,
	isSearching: boolean
}

export const useCollectionStore = defineStore('collection', {

	state: () => ({
		searchResults: [],
		collection: [],
		lists: [],
		selectedSearch: new SearchResult(),
		selectedUserTitle: new Title(),
		selectedList: new MediaList(),
		isSearching: false
	} as CollectionState),

	actions: {

		setSelectedSearchItem(val: SearchResult) {
			this.selectedSearch = val
		},

		setSelectedUserTitle(val: Title) {
			this.selectedUserTitle = val
		},

		setSelectedList(val: MediaList) {
			this.selectedList = val
		},

		setRandomUserTitle() {
			if (this.filteredCollection.length == 0) return

			const index = Math.floor(Math.random() * this.filteredCollection.length)
			this.selectedUserTitle = this.filteredCollection[index]
		},

		clearSearchResults() {
			this.searchResults = []
		},

		clearSearchData() {
			this.selectedSearch = new SearchResult()
			this.searchResults = []
		},

		clearUserTitleData() {
			this.selectedUserTitle = new Title()
		},

		clearSelectedList() {
			this.selectedList = new MediaList()
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
			} else {
				this.searchResults = []
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

			const promises = [

				MediaProvider.getUserTitles(userId ?? 0)
					.then((res: Title[]) => {
						this.collection = res
					})
					.catch((e: any) => {
						console.error(e)
						store.setIsErrored(true, 'Error fetching user collection')
					}),

				MediaProvider.getUserLists(userId ?? 0)
					.then((res: MediaList[]) => {
						this.lists = res
					})
					.catch((e: any) => {
						console.error(e)
						store.setIsErrored(true, 'Error fetching user lists')
					})
			]

			await Promise.all(promises)
				.finally(() => {
					store.setIsLoading(false)
				})
		},

		unloadCollection() {
			this.collection = []
			this.lists = []
		},

		async addUserItem(userData: UserTitleData) {

			const store = useMainStore()
			const userId = store.userId

			if (userId <= 0) {
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

			if (userId <= 0 || titleId <= 0) {

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

			if (userId <= 0 || titleId <= 0) {

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

		async addUserList(data: UserListData) {

			const store = useMainStore()
			const userId = store.userId

			if (userId <= 0) {
				console.error(`Could not create list for unknown user`)
				store.setIsErrored(true, `Error adding list`)
			} else {

				store.setIsLoading(true)

				const request = {
					userId: userId,
					name: data.name,
					description: data.description
				} as AddUserListRequest

				MediaProvider.addUserList(request)
					.then((res: boolean) => {
						if (res) {
							this.loadCollection()
						} else {
							throw Error('Error creating new list')
						}
					})
					.catch((e: any) => {
						console.log(e)
						store.setIsErrored(true, `Error creating list`)
					})
					.finally(() => {
						// this.clearSearchData()
						store.setIsLoading(false)
					})
			}
		},

		async updateUserList(data: UserListData, listId: number) {

			const store = useMainStore()
			const userId = store.userId

			if (userId <= 0 || listId <= 0) {
				console.error(`Could not update list for unknown ${!!userId && !!listId ? 'user and list' : !!userId ? 'user' : 'list'}`)
				store.setIsErrored(true, `Error updating list`)
			} else {

				store.setIsLoading(true)

				const request = {
					userId: userId,
					listId: listId,
					name: data.name,
					description: data.description
				} as UpdateUserListRequest

				MediaProvider.updateUserList(request)
					.then((res: boolean) => {
						if (res) {
							this.loadCollection().then(() => {
								this.setSelectedList(this.lists.find(l => l.listId == listId) as MediaList)
							})
						} else {
							throw Error('Error updating new list')
						}
					})
					.catch((e: any) => {
						console.log(e)
						store.setIsErrored(true, `Error updating list`)
					})
					.finally(() => {
						// this.clearSelectedList()
						store.setIsLoading(false)
					})
			}
		},

		async deleteUserList(listId: number) {

			const store = useMainStore()

			if (listId <= 0) {
				console.error(`Could not delete unknown list`)
				store.setIsErrored(true, `Error updating list`)
			} else {

				store.setIsLoading(true)

				MediaProvider.deleteUserList(listId)
					.then((res: boolean) => {
						if (res) {
							this.loadCollection()
						} else {
							throw Error('Error deleting list')
						}
					})
					.catch((e: any) => {
						console.log(e)
						store.setIsErrored(true, `Error deleting list`)
					})
					.finally(() => {
						this.clearSelectedList()
						store.setIsLoading(false)
					})
			}
		},

	},
	getters: {
		filteredCollection: (state: CollectionState) => {
			const filter = useFilterStore()
			// hack to make sure filteredCollection is updated when direction changes
			filter.criteria.direction
			state.collection
			return filter.criteria.SortAndFilterTitles(state.collection)
		},
		listItems: (state: CollectionState) => {
			return !!state.selectedList?.name ? state.collection.filter(c => state.selectedList.titleIds.some(t => t == c.id)) : [] as Title[]
		},
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCollectionStore, import.meta.hot))
}
