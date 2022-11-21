<template>
	<div class="container-fluid filter-bar ma-0 py-0 px-2">

		<v-toolbar border>

			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>mdi-plus</v-icon>
			</v-btn>

			<!-- TODO: add sort -->


			<!-- SELECT: PERSONAL FILTERS -->
			<v-select label="Your Filters" density="compact" width="200px" variant="outlined" class="px-4">
				<template v-slot:no-data>
				</template>
				<template v-slot:prepend-item>
					<v-list-item ripple @mousedown.prevent>
						<!-- <v-list-item ripple @mousedown.prevent @click="clearPersonalRankings"> -->

						<v-btn @click="clearPersonalFilters" rounded :text="!isUnfiltered" variant="text">
							Clear Personal Filters
						</v-btn>

						<!-- <v-list-item-content>
									<v-list-item-title>
										Clear Personal Filters
									</v-list-item-title>
								</v-list-item-content> -->
					</v-list-item>
					<v-divider class="mt-2"></v-divider>
				</template>

				<template v-slot:append-item>
					<v-divider class="mb-2"></v-divider>

					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="toggleFavorites()" rounded :text="!isUnfiltered"
								variant="text">
								Favorites
							</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="toggleWatched()" rounded :text="!isUnfiltered"
								variant="text">To
								Do
							</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="toggleUpNext()" rounded :text="!isUnfiltered"
								variant="text">Up
								Next
							</v-btn>
						</v-list-item-title>
					</v-list-item>
				</template>
			</v-select>


			<v-select items="['Movie','TV']" label="Media Type" density="compact" min-width="200px"></v-select>


			<v-menu v-model="menu" :open-delay="0" :close-on-content-click="false">
				<template v-slot:activator="{ props }">
					<v-btn icon v-bind="props">
						<v-icon>mdi-tune</v-icon>
					</v-btn>
				</template>


				<v-card min-width="300">
					<v-list>
						<v-list-item-title class="text-spaced px-4">
							Filter your collection
						</v-list-item-title>

					</v-list>

					<v-divider></v-divider>

					<v-list>

						<v-list-item>
							<v-list-item-title>
								<v-btn :active="isUnfiltered" @click="resetFilter()" rounded :text="!isUnfiltered"
									variant="text">Show All</v-btn>
							</v-list-item-title>
							<!-- <v-switch v-model="message" color="purple" label="Enable messages" hide-details></v-switch> -->
						</v-list-item>

						<!-- <v-list-item>
							<v-switch v-model="hints" color="purple" label="Enable hints" hide-details></v-switch>
						</v-list-item> -->
					</v-list>



					<PersonalFilterMenu v-model="subMenuPersonal" />






					<v-select label="Your Filters" density="compact" width="200px" variant="outlined" class="px-4">
						<template v-slot:no-data>
						</template>
						<template v-slot:prepend-item>
							<v-list-item ripple @mousedown.prevent>
								<!-- <v-list-item ripple @mousedown.prevent @click="clearPersonalRankings"> -->

								<v-btn @click="clearPersonalFilters" rounded :text="!isUnfiltered" variant="text">
									Clear Personal Filters
								</v-btn>

								<!-- <v-list-item-content>
									<v-list-item-title>
										Clear Personal Filters
									</v-list-item-title>
								</v-list-item-content> -->
							</v-list-item>
							<v-divider class="mt-2"></v-divider>
						</template>

						<template v-slot:append-item>
							<v-divider class="mb-2"></v-divider>

							<v-list-item>
								<v-list-item-title>
									<v-btn :active="isUnfiltered" @click="toggleFavorites()" rounded
										:text="!isUnfiltered" variant="text">
										Favorites
									</v-btn>
								</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>
									<v-btn :active="isUnfiltered" @click="toggleWatched()" rounded :text="!isUnfiltered"
										variant="text">To
										Do
									</v-btn>
								</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>
									<v-btn :active="isUnfiltered" @click="toggleUpNext()" rounded :text="!isUnfiltered"
										variant="text">Up
										Next
									</v-btn>
								</v-list-item-title>
							</v-list-item>
						</template>
					</v-select>



					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" variant="text" @click="menu = false">
							Close Filter
						</v-btn>
					</v-card-actions>
				</v-card>



				<!-- <v-list min-width="200px"> -->
				<!-- <v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="resetFilter()" rounded :text="!isUnfiltered"
								variant="text">All</v-btn>
						</v-list-item-title>
					</v-list-item> -->

				<!--
					<v-list-group value="View Type">
						<template v-slot:activator="{ props }">
							<v-list-item v-bind="props" title="View Type"></v-list-item>
						</template>

						<v-list-item>
							<v-list-item-title>
								<v-btn :active="isUnfiltered" @click="toggleFavorites()" rounded :text="!isUnfiltered"
									variant="text">Favorites
								</v-btn>
							</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<v-list-item-title>
								<v-btn :active="isUnfiltered" @click="toggleWatched()" rounded :text="!isUnfiltered"
									variant="text">To Do
								</v-btn>
							</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<v-list-item-title>
								<v-btn :active="isUnfiltered" @click="toggleUpNext()" rounded :text="!isUnfiltered"
									variant="text">Up Next
								</v-btn>
							</v-list-item-title>
						</v-list-item>
					</v-list-group>

					<v-list-group value="Media Type">
						<template v-slot:activator="{ props }">
							<v-list-item v-bind="props" title="Media Type"></v-list-item>
						</template>

						<v-list-item>
							<v-list-item-title>
								<v-btn :active="isUnfiltered" @click="toggleMovies()" rounded :text="!isUnfiltered"
									variant="text">Movies
								</v-btn>
							</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<v-list-item-title>
								<v-btn :active="isUnfiltered" @click="toggleTv()" rounded :text="!isUnfiltered"
									variant="text">TV</v-btn>
							</v-list-item-title>
						</v-list-item>
					</v-list-group> -->

				<!-- <v-list-item>
						<v-list-item-title>
							<v-btn :active="isUnfiltered" @click="surprise()" rounded :text="!isUnfiltered"
								variant="text">
								<v-icon>mdi-dice-5</v-icon>
							</v-btn>
						</v-list-item-title>
					</v-list-item> -->



				<!-- <v-list-item>
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
					</v-list-item> -->

				<!-- </v-list> -->
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
import PersonalFilterMenu from '@/components/filter/PersonalFilterMenu.vue'

const store = useMainStore()
const filter = useFilterStore()

const searchModel = ref<any>(null) // TODO: what is this type? -- number, but can it be object?
// const searchModel: any = null // TODO: what is this type?

const menu = ref(false)
const subMenuPersonal = ref(false)
const subMenuMediaType = ref(false)
const search = ref('')
// const search = ''

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext && !filter.filterToTv && !filter.filterToMovies
})

const clearPersonalFilters = () => {
	// filter.toggleUpNext()
	subMenuPersonal.value = false
}

const toggleFavorites = () => {
	filter.toggleFavorites()
	subMenuPersonal.value = false
}

const toggleWatched = () => {
	filter.toggleWatched()
	subMenuPersonal.value = false
}

const toggleUpNext = () => {
	filter.toggleUpNext()
	subMenuPersonal.value = false
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
