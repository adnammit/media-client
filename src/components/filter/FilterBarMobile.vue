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

		</v-toolbar>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFilterStore } from '@/store/filter'
import { useCollectionStore } from '@/store/collection'
import PersonalFilterMenu from '@/components/filter/PersonalFilterMenu.vue'
import MediaFilterMenu from '@/components/filter/MediaFilterMenu.vue'

const filter = useFilterStore()
const collection = useCollectionStore()

const searchModel = ref<any>(null) // TODO: what is this type? -- number, but can it be object?
// const searchModel: any = null // TODO: what is this type?

const menu = ref(false)
const subMenuPersonal = ref(false)
const subMenuMedia = ref(false)
const search = ref('')

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
	collection.Search(newValue)
})

// convert to computed get/set
watch(() => searchModel.value, (newValue) => {
	// console.log('>> search model is ');
	// console.log(newValue);

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
</style>
