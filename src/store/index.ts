import { acceptHMRUpdate, defineStore } from 'pinia'
import { useFilterStore } from '@/store/filter'
import type IUser from '@/models/user'
import type Title from '@/models/title'
import { MediaType } from '@/models/enum'
import type AddUserTitleRequest from '@/models/dto/addUserTitleRequest'
import type UserTitleData from '@/dto/userTitleData'
import MediaProvider from '@/services/MediaProvider'
import MovieDbApi from '@/services/MovieDbApi'

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

		setIsLoading(val: boolean) {
			this.isLoading = val
		},

		setIsErrored(val: boolean, message?: string) {
			this.error = { isError: val, message: message ?? '' }
		},

		login(user: IUser) {
			this.error = { isError: false, message: '' }
			this.user = user
			this.loadCollection()
		},

		logout() {
			this.user = null
			this.$router.push({ path: '/' })
			this.unloadCollection()
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

		async addUserItem(userData: UserTitleData) {

			const userId = this.userId

			if (userId < 0) {
				console.error(`Could not create user item for unknown user`)
				this.error = { isError: true, message: `Error adding item to collection` }
			} else {

				this.isLoading = true

				const filter = useFilterStore()
				const item = filter.selectedItem
				// fwiw i hate this -- the data that we get from searching is missing imdbid so we need to get the full object and tack it on before storing it
				const dto = await MovieDbApi.getTitle(item.movieDbId, item.mediaType)
					.catch((e: any) => {
						console.log(e)
					})

				if (dto == null || dto.imdb_id.trim() == '') {
					this.error = { isError: true, message: 'Error retrieving MovieDb data for this title' }
					this.isLoading = false
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
						this.error = { isError: true, message: 'Error adding item' }
					})
					.finally(() => {
						filter.clearSearchData()
						this.isLoading = false
					})
			}
		},

		async updateUserItem(titleId: number, userData: UserTitleData) {

			const userId = this.userId

			if (userId < 0 || titleId < 0) {

				console.error(`Could not create user item for unknown ${!!userId && !!titleId ? 'user and title' : !!userId ? 'user' : 'title'}`)
				this.error = { isError: true, message: `Error adding item to collection` }

			} else {

				this.isLoading = true

				// const filter = useFilterStore()
				// const item = filter.selectedItem
				// // fwiw i hate this -- the data that we get from searching is missing imdbid so we need to get the full object and tack it on before storing it
				// const dto = await MovieDbApi.getTitle(item.movieDbId, item.mediaType)

				// const request = {
				// 	userId: userId,
				// 	movieDbId: item.movieDbId,
				// 	mediaType: item.mediaType,
				// 	imdbId: dto.imdb_id,
				// 	queued: userData.queued,
				// 	favorite: userData.favorite,
				// 	watched: userData.watched,
				// 	rating: userData.rating,
				// } as AddUserTitleRequest

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
						this.error = { isError: true, message: 'Error saving updates to title' }
					})
					.finally(() => {
						// filter.clearSearchData()
						this.isLoading = false
					})
			}
		},

	},
	getters: {
		userId: (state: RootState): number => state.user?.id ?? -1,
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

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}