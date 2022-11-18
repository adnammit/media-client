<template>
	<div class="container-fluid filter-bar ma-0 py-0 px-2">
		<div>
			<v-toolbar border>
				<v-btn @click="resetFilter()" rounded :text="!isUnfiltered">All</v-btn>
				<v-btn @click="toggleFavorites()" rounded :text="!isFilteredByFavorite">Favorites</v-btn>
				<v-btn @click="toggleWatched()" rounded :text="!isFilteredByWatched">To Do</v-btn>
				<v-btn @click="toggleUpNext()" rounded :text="!isFilteredByUpNext">Up Next</v-btn>
				<v-btn @click="toggleMovies()" rounded :text="!isFilteredByMovies">Movies</v-btn>
				<v-btn @click="toggleTv()" rounded :text="!isFilteredByTv">Tv</v-btn>
				<v-btn @click="surprise()" rounded text>
					<v-icon>mdi-dice-5</v-icon>
				</v-btn>
				<v-spacer></v-spacer>

				<v-autocomplete v-model="searchModel" :items="searchItems" :loading="isSearching"
					v-model:search="search" clearable hide-details item-title="title"
					item-value="movieDbId" label="Add to your collection..." dense variant="underlined">
					<template v-slot:no-data>
						<v-list-item>
							<v-list-item-title>
								Search for movie and show titles
							</v-list-item-title>
						</v-list-item>
					</template>

					<!-- IF WE WANTED TO SHOW WHAT WE SELECTED: -->
					<template v-slot:selection="{ attr, on, item, selected }">
						<v-chip v-bind="attr" :model-value="selected" color="blue-grey" v-on="on">
							<v-icon start>
								mdi-magnify
							</v-icon>
							<span v-text="item.title"></span>
						</v-chip>
					</template>

					<template v-slot:item="{ props, item }">
						<!-- TODO display genre, maybe pic? -->
						<v-list-item v-bind="props" :title="item.raw.title" :subtitle="item.raw.releaseYear">
						</v-list-item>
					</template>
				</v-autocomplete>
			</v-toolbar>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import type SearchResult from '@/models/searchResult'

export default defineComponent({
	data() {
		return {
			searchModel: null,
			search: '',
		}
	},
	computed: {
		isFilteredByFavorite(): boolean {
			return this.filterStore.filterByFavorite
		},
		isFilteredByWatched(): boolean {
			return this.filterStore.filterByWatched
		},
		isFilteredByUpNext(): boolean {
			return this.filterStore.filterByUpNext
		},
		isFilteredByMovies(): boolean {
			return this.filterStore.filterToMovies
		},
		isFilteredByTv(): boolean {
			return this.filterStore.filterToTv
		},
		isUnfiltered(): boolean {
			return !this.filterStore.filterByWatched && !this.filterStore.filterByFavorite && !this.filterStore.filterByUpNext && !this.filterStore.filterToTv && !this.filterStore.filterToMovies
		},
		searchItems(): SearchResult[] {
			return this.filterStore.results
		},
		selectedItem(): SearchResult | undefined {
			console.log('>> selected item ' + JSON.stringify(this.filterStore.selectedItem));
			return this.filterStore.selectedItem
		},

		// selectedItem: {
		// 	get() {
		// 		return this.filterStore.selectedItem
		// 	},
		// 	set(value: boolean) {
		// 		this.filterStore.toggleShowSelectedItem(value)
		// 		// this.$emit('input', value)
		// 	}
		// },

		isSearching(): boolean {
			return this.filterStore.isSearching
		}
	},
	methods: {

		toggleFavorites(): void {
			this.filterStore.toggleFavorites()
		},

		toggleWatched(): void {
			this.filterStore.toggleWatched()
		},

		toggleUpNext(): void {
			this.filterStore.toggleUpNext()
		},

		toggleMovies(): void {
			this.filterStore.toggleMovies()
		},

		toggleTv(): void {
			this.filterStore.toggleTv()
		},

		resetFilter(): void {
			this.filterStore.resetFilter()
		},

		surprise(): void {
			window.alert('Surprise!')
		},

	},
	watch: {
		search(val) {
			this.filterStore.Search(val)
		},
		searchModel(val) {
			if (!!val) {
				const result = this.searchItems.find(s => s.movieDbId == val)

				if (!!result) {
					this.filterStore.setSelectedItem(result)
				} else {
					console.error(`Error finding search result for movieDbId ${val}`)
					this.filterStore.resetSearch()
				}
			}
			console.log('>> updating seach model ' + JSON.stringify(val));

			// this.search = ''
			// console.log('>> search is ' + JSON.stringify(this.search));


		},
		selectedItem(val) {
			console.log('>> selected item changed ' + JSON.stringify(val));
			// clear our local value when the store updates
			if (!val) {
				this.searchModel = null
			}
			// if (!!val) {
			// 	const result = this.searchItems.find(s => s.movieDbId == val)

			// 	if (!!result) {
			// 		this.filterStore.setSelectedItem(result)
			// 	} else {
			// 		console.error(`Error finding search result for movieDbId ${val}`)
			// 		this.filterStore.resetSearch()
			// 	}
			// }
		}
	},
	setup() {
		const mainStore = useMainStore()
		const filterStore = useFilterStore()
		return { mainStore, filterStore }
	}
})



</script>

<style scoped lang="scss">
@import '@/assets/colors';

.filter-bar {
	width: 100%;
}
</style>
