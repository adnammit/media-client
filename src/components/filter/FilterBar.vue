<template>
	<div class="container-fluid filter-bar ma-0 py-0 px-2">
		<div>
			<v-toolbar border>
				<v-btn :active="isUnfiltered" @click="resetFilter()" rounded :text="!isUnfiltered" variant="text">All
				</v-btn>
				<v-btn :active="filter.filterByFavorite" @click="toggleFavorites()" rounded
					:text="!filter.filterByFavorite" variant="text">Favorites</v-btn>
				<v-btn :active="filter.filterByWatched" @click="toggleWatched()" rounded :text="!filter.filterByWatched"
					variant="text">To Do</v-btn>
				<v-btn :active="filter.filterByUpNext" @click="toggleUpNext()" rounded :text="!filter.filterByUpNext"
					variant="text">Up Next</v-btn>
				<v-btn :active="filter.filterToMovies" @click="toggleMovies()" rounded :text="!filter.filterToMovies"
					variant="text">Movies</v-btn>
				<v-btn :active="filter.filterToTv" @click="toggleTv()" rounded :text="!filter.filterToTv"
					variant="text">Tv</v-btn>

				<v-tooltip text="Select a Random Title" location="top" open-delay="300">
					<template v-slot:activator="{ props }">
						<v-btn @click="surprise" rounded text v-bind="props">
							<v-icon>mdi-dice-5</v-icon>
						</v-btn>
					</template>
				</v-tooltip>

				<v-spacer></v-spacer>

				<v-autocomplete v-model="searchModel" :items="collection.searchResults"
					:loading="collection.isSearching" v-model:search="search" clearable hide-details item-title="title"
					item-value="movieDbId" label="Add to your collection..." dense variant="underlined"
					class="search-bar pr-4">
					<template v-slot:no-data>
						<v-list-item>
							<v-list-item-title>
								Search for movie and show titles
							</v-list-item-title>
						</v-list-item>
					</template>

					<!-- IF WE WANTED TO SHOW WHAT WE SELECTED: -->
					<!-- <template v-slot:selection="{ attr, on, item, selected }">
						<v-chip v-bind="attr" :model-value="selected" color="blue-grey" v-on="on">
							<v-icon start>
								mdi-magnify
							</v-icon>
							<span v-text="item.title"></span>
						</v-chip>
					</template> -->

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

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFilterStore } from '@/store/filter'
import { useCollectionStore } from '@/store/collection'

const filter = useFilterStore()
const collection = useCollectionStore()

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
	collection.Search(newValue)
})

// convert to computed get/set
watch(() => searchModel.value, (newValue) => {
	// TODO review this logic starting with truthiness of all these things
	if (!!newValue) { // newValue is number

		const result = collection.searchResults.find(s => s.movieDbId == newValue)

		if (!!result?.title) {
			collection.setSelectedSearchItem(result)
		} else {
			console.error(`Error finding search result for movieDbId ${newValue}`)
			collection.clearSearchData()
		}
	}
})

// convert to computed get/set
watch(() => collection.selectedSearch, (newValue) => {
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

.search-bar {
	max-width: 400px;
}
</style>
