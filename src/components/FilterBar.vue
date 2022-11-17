<template>
	<div class="container-fluid filter-bar">
		<div>
			<v-toolbar dense short flat>
				<!-- <v-toolbar-title class="mr-5">As you wish</v-toolbar-title> -->
				<!-- <v-spacer></v-spacer> -->
				<v-btn @click="resetFilter()" rounded :text="!isUnfiltered">All</v-btn>
				<v-btn @click="toggleFavorites()" rounded :text="!isFilteredByFavorite">Favorites</v-btn>
				<v-btn @click="toggleWatched()" rounded :text="!isFilteredByWatched">To Do</v-btn>
				<v-btn @click="toggleUpNext()" rounded :text="!isFilteredByUpNext">Up Next</v-btn>
				<v-btn @click="toggleMovies()" rounded :text="!isFilteredByMovies">Movies</v-btn>
				<v-btn @click="toggleTv()" rounded :text="!isFilteredByTv">Tv</v-btn>
				<v-btn @click="surprise()" rounded text>
					<v-icon>mdi-pizza</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-text-field class="filter-bar__search" outlined dense clearable label="Search" v-model="search"
						@keyup.native.enter="doSearch()" prepend-inner-icon="mdi-magnify"></v-text-field>
				</v-toolbar-items>
			</v-toolbar>
		</div>
		<div class="text-center loader">
			<div v-if="isLoading">
				<v-progress-linear indeterminate color="cyan"></v-progress-linear>
			</div>
			<div v-else class="loader--placeholder">
				<span></span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'

export default defineComponent({
	data() {
		return {
			search: '',
			maxPreviewWordLength: 75
		}
	},
	computed: {
		isLoading(): boolean {
			return this.mainStore.isLoading
		},
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
	},
	methods: {
		doSearch(): void {
			this.filterStore.Search(this.search)
		},

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
			window.alert('Surpise!')
		},
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

.filter-bar .v-toolbar {
	// color: $alto;
	background-color: red !important;

	// .filter-bar__search {
	// 	padding-top: 4px;
	// }

	// .loader--placeholder {
	// 	height: 20px;
	// 	width: 1px;
	// }
}
</style>
