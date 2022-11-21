<template>
	<div class="container-fluid filter-bar ma-0 py-0 px-2">

		<v-toolbar border>

			<v-spacer></v-spacer>

			<!-- TODO: add search -->
			<v-btn icon>
				<v-icon>mdi-plus</v-icon>
			</v-btn>

			<!-- TODO: add sort -->

			<v-menu v-model="menu" :open-delay="0" :close-on-content-click="false">
				<template v-slot:activator="{ props }">
					<v-btn icon v-bind="props">
						<v-icon>mdi-tune</v-icon>
					</v-btn>
				</template>

				<v-card min-width="300" class="pa-4">

					<v-row>
						<v-col cols="12">
							<v-btn :active="isUnfiltered" @click="resetFilter()" rounded :text="!isUnfiltered"
								variant="text" width="100%">Show All</v-btn>
						</v-col>
					</v-row>

					<PersonalFilterMenu v-model="subMenuPersonal" />
					<MediaFilterMenu v-model="subMenuMedia" />

					<!-- TODO: add search in collection -->

					<v-card-actions>
						<v-row>
							<v-col cols="12">
								<v-btn rounded variant="outlined" @click="menu = false" width="100%">
									Close Filter
								</v-btn>
							</v-col>
						</v-row>

					</v-card-actions>
				</v-card>

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
import MediaFilterMenu from '@/components/filter/MediaFilterMenu.vue'

const store = useMainStore()
const filter = useFilterStore()

const searchModel = ref<any>(null) // TODO: what is this type? -- number, but can it be object?
// const searchModel: any = null // TODO: what is this type?

const menu = ref(false)
const subMenuPersonal = ref(false)
const subMenuMedia = ref(false)
const search = ref('')
// const search = ''

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext && !filter.filterToTv && !filter.filterToMovies
})

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
