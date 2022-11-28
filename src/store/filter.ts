import type { GenreItem } from '@/helpers/genre'
import { SortDirection, type SortCriteria } from '@/models/enum'
import FilterCriteria from '@/models/filterCriteria'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type FilterState = {
	criteria: FilterCriteria
}

export const useFilterStore = defineStore('filter', {

	state: () => ({
		criteria: new FilterCriteria(),
	} as FilterState),

	actions: {

		toggleFavorites() {
			const val = !this.criteria.filterByFavorite
			this.criteria.filterByFavorite = val
			if (val && this.criteria.filterByWatched) this.criteria.filterByWatched = false
			if (val && this.criteria.filterByUpNext) this.criteria.filterByUpNext = false
		},

		toggleWatched() {
			const val = !this.criteria.filterByWatched
			this.criteria.filterByWatched = val
			if (val && this.criteria.filterByFavorite) this.criteria.filterByFavorite = false
			if (val && this.criteria.filterByUpNext) this.criteria.filterByUpNext = false
		},

		toggleUpNext() {
			const val = !this.criteria.filterByUpNext
			this.criteria.filterByUpNext = val
			if (val && this.criteria.filterByFavorite) this.criteria.filterByFavorite = false
			if (val && this.criteria.filterByWatched) this.criteria.filterByWatched = false
		},

		toggleMovies() {
			const val = !this.criteria.filterToMovies
			this.criteria.filterToMovies = val
			if (val && this.criteria.filterToTv) this.criteria.filterToTv = false
		},

		toggleTv() {
			const val = !this.criteria.filterToTv
			this.criteria.filterToTv = val
			if (val && this.criteria.filterToMovies) this.criteria.filterToMovies = false
		},

		setGenre(val: GenreItem) {
			this.criteria.filterGenre = val
		},

		resetGenre() {
			this.criteria.filterGenre = undefined
		},

		setSortCriteria(val: SortCriteria) {
			this.criteria.criteria = val
		},

		toggleSortDirection() {
			if (this.criteria.direction == SortDirection.Ascending) {
				this.criteria.direction = SortDirection.Descending
			} else {
				this.criteria.direction = SortDirection.Ascending
			}
		},

		setGlobalSearch(val: string) {
			this.criteria.globalSearch = val
		},

		resetGlobalSearch() {
			this.criteria.globalSearch = ''
		},

		resetPersonalFilters() {
			this.criteria.filterByFavorite = false
			this.criteria.filterByWatched = false
			this.criteria.filterByUpNext = false
		},

		resetMediaFilters() {
			this.criteria.filterToMovies = false
			this.criteria.filterToTv = false
		},

		resetFilter() {
			this.criteria.filterByFavorite = false
			this.criteria.filterByWatched = false
			this.criteria.filterByUpNext = false
			this.criteria.filterToMovies = false
			this.criteria.filterToTv = false
			this.resetGenre()
		},
	},
	getters: {
		filterByFavorite: (state: FilterState) => {
			return state.criteria.filterByFavorite
		},
		filterByWatched: (state: FilterState) => {
			return state.criteria.filterByWatched
		},
		filterByUpNext: (state: FilterState) => {
			return state.criteria.filterByUpNext
		},
		filterToMovies: (state: FilterState) => {
			return state.criteria.filterToMovies
		},
		filterToTv: (state: FilterState) => {
			return state.criteria.filterToTv
		},
		globalSearch: (state: FilterState) => {
			return state.criteria.globalSearch
		},
		genreFilter: (state: FilterState) => {
			return state.criteria.filterGenre
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useFilterStore, import.meta.hot))
}
