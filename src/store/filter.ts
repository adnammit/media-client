import { acceptHMRUpdate, defineStore } from 'pinia'

export type FilterState = {
	filterByFavorite: boolean
	filterByWatched: boolean
	filterByUpNext: boolean
	filterToMovies: boolean
	filterToTv: boolean
}

export const useFilterStore = defineStore('filter', {

	state: () => ({
		filterByFavorite: false,
		filterByWatched: false,
		filterByUpNext: false,
		filterToMovies: false,
		filterToTv: false,
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

		resetPersonalFilters() {
			this.filterByFavorite = false
			this.filterByWatched = false
			this.filterByUpNext = false
		},

		resetMediaFilters() {
			this.filterToMovies = false
			this.filterToTv = false
		},

		resetFilter() {
			this.filterByFavorite = false
			this.filterByWatched = false
			this.filterByUpNext = false
			this.filterToMovies = false
			this.filterToTv = false
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useFilterStore, import.meta.hot))
}
