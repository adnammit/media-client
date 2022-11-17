import { defineStore } from 'pinia'
import type SearchResult from '@/models/searchResult'
import { useMainStore } from '@/store'
import MovieDbApi from '@/services/MovieDbApi'

export type FilterState = {
	filterByFavorite: boolean
	filterByWatched: boolean
	filterByUpNext: boolean
	filterToMovies: boolean
	filterToTv: boolean
	showSearch: boolean
	results: SearchResult[]
}

export const useFilterStore = defineStore('filter', {

	state: () => ({
		filterByFavorite: false,
		filterByWatched: false,
		filterByUpNext: false,
		filterToMovies: false,
		filterToTv: false,
		showSearch: false,
		results: []
	} as FilterState),

	actions: {

		toggleFavorites() {
			const val = !this.filterByFavorite
			this.filterByFavorite = val
			if (val && this.filterByWatched) this.filterByWatched = false
			if (val && this.filterByUpNext) this.filterByUpNext = false
		},

		toggleWatched() {
			const val = !this.filterByWatched
			this.filterByWatched = val
			if (val && this.filterByFavorite) this.filterByFavorite = false
			if (val && this.filterByUpNext) this.filterByUpNext = false
		},

		toggleUpNext() {
			const val = !this.filterByUpNext
			this.filterByUpNext = val
			if (val && this.filterByFavorite) this.filterByFavorite = false
			if (val && this.filterByWatched) this.filterByWatched = false
		},

		toggleMovies() {
			const val = !this.filterToMovies
			this.filterToMovies = val
			if (val && this.filterToTv) this.filterToTv = false
		},

		toggleTv() {
			const val = !this.filterToTv
			this.filterToTv = val
			if (val && this.filterToMovies) this.filterToMovies = false
		},

		resetFilter() {
			this.filterByFavorite = false
			this.filterByWatched = false
			this.filterByUpNext = false
			this.filterToMovies = false
			this.filterToTv = false
		},

		setShowSearch(val: boolean) {
			this.showSearch = val
		},

		async Search(search: string) {

			this.mainStore.setIsLoading(true)

			MovieDbApi.search(search)
				.then((results: any) => {
					if (results.Error != null) {
						throw Error('Error contacting movie api ' + JSON.stringify(results.Error))
					} else {
						this.results = results
						this.showSearch = true
					}
				})
				.catch((e: any) => {
					console.log(e)
					this.mainStore.setIsErrored(true, 'Error while searching')
				})
				.finally(() => {
					this.mainStore.setIsLoading(false)
				})
		},

		async clearSearch() {
			this.results = []
		},

	},

	getters: {
		mainStore():any {
			return useMainStore()
		},
	}
})
