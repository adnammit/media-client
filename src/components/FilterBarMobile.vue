<template>
	<div class="container-fluid filter-bar ma-0 py-0 px-2">

		<v-toolbar border>

			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>mdi-plus</v-icon>
			</v-btn>


			<v-menu open-on-hover :open-delay="0">
				<template v-slot:activator="{ props }">
					<v-btn icon v-bind="props">
						<v-icon>mdi-tune</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="resetFilter()" rounded :text="!isUnfiltered"
								variant="text">All</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="toggleFavorites()" rounded :text="!isUnfiltered"
								variant="text">Favorites</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="toggleWatched()" rounded :text="!isUnfiltered"
								variant="text">To Do</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="toggleUpNext()" rounded :text="!isUnfiltered"
								variant="text">Up Next</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="toggleMovies()" rounded :text="!isUnfiltered"
								variant="text">Movies</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="toggleTv()" rounded :text="!isUnfiltered"
								variant="text">TV</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="surprise()" rounded :text="!isUnfiltered"
								variant="text">
								<v-icon>mdi-dice-5</v-icon>
							</v-btn>
						</v-list-item-title>
					</v-list-item>

				</v-list>
			</v-menu>

			<!-- <v-autocomplete v-model="searchModel" :items="filter.searchResults" :loading="filter.isSearching"
				v-model:search="search" clearable hide-details item-title="title" item-value="movieDbId"
				label="Add to your collection..." dense variant="underlined">
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							Search for movie and show titles
						</v-list-item-title>
					</v-list-item>
				</template>

				<template v-slot:item="{ props, item }">
					<v-list-item v-bind="props" :title="item.raw.title" :subtitle="item.raw.releaseYear">
					</v-list-item>
				</template>
			</v-autocomplete> -->
		</v-toolbar>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import type SearchResult from '@/models/searchResult'

const store = useMainStore()
const filter = useFilterStore()

const searchModel = ref<any>(null) // TODO: what is this type? -- number, but can it be object?
// const searchModel: any = null // TODO: what is this type?

const search = ref('')
// const search = ''

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext && !filter.filterToTv && !filter.filterToMovies
})

const toggleFavorites = () => {
	filter.toggleFavorites()
}

const toggleWatched = () => {
	filter.toggleWatched()
}

const toggleUpNext = () => {
	filter.toggleUpNext()
}

const toggleMovies = () => {
	filter.toggleMovies()
}

const toggleTv = () => {
	filter.toggleTv()
}

const resetFilter = () => {
	filter.resetFilter()
}

const surprise = () => {
	window.alert('Surprise!')
}

// convert to computed get/set
watch(() => search.value, (newValue) => {
	// console.log('>> search updated ' + newValue);
	filter.Search(newValue)
})

// convert to computed get/set
watch(() => searchModel.value, (newValue) => {
	// console.log('>> search model is ');
	// console.log(newValue);

	// TODO review this logic starting with truthiness of all these things
	if (!!newValue) { // newValue is number
		const result = filter.searchResults.find(s => s.movieDbId == newValue)

		if (!!result?.title) {
			filter.setSelectedItem(result)
		} else {
			console.error(`Error finding search result for movieDbId ${newValue}`)
			filter.clearSearchData()
		}
	}
})

// convert to computed get/set
watch(() => filter.selectedItem, (newValue) => {
	// clear our local value when the store updates
	if (!newValue?.title) {
		searchModel.value = null
	}
})

</script>

<style scoped lang="scss">
@import '@/assets/colors';

.filter-bar {
	width: 100%;
}
</style>
