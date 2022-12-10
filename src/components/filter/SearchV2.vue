<template>

	<v-text-field v-model="search" label="Add to your collection" variant="outlined" autofocus></v-text-field>

	<!-- TODO make scrolling better -->

	<div class="scroll">
		<v-list v-model:selected="searchModel">
			<v-list-item v-for="(item, movieDbId) in collection.searchResults" :key="movieDbId" :value="item.movieDbId"
				class="px-0">
				<template v-slot:default="{ props }">
					<v-row v-bind="props">
						<v-col cols="auto" class="vertical-center">
							<v-img :src="getPosterUrl(item)" class="search__list-item rounded-lg mx-3" cover
								:max-height="posterHeight" :max-width="posterHeight" :aspect-ratio="1">
								<template v-slot:placeholder>
									<v-row class="fill-height ma-0" align="center" justify="center">
										<!-- TODO just a default image -->
										<v-progress-circular indeterminate color="grey lighten-5">
										</v-progress-circular>
									</v-row>
								</template>
							</v-img>
						</v-col>
						<v-col cols="auto" class="vertical-center">
							<div>
								{{ item.title }}
								<div class="text-body-2">
									{{ formatYear(item.releaseDate) }}
								</div>
							</div>
						</v-col>
					</v-row>
				</template>
			</v-list-item>
		</v-list>
	</div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCollectionStore } from '@/store/collection'
import { formatYear } from '@/helpers/format'
import type SearchResult from '@/models/searchResult'

const emit = defineEmits(['onSearch'])

const collection = useCollectionStore()

const searchModel = ref<number | undefined>(undefined)
const search = ref('')
const posterHeight = `30px`

const getPosterUrl = (item: SearchResult) => {
	return `${import.meta.env.VITE_POSTER_BASE_PATH}${item.poster}`
}

watch(() => search.value, (newValue) => {
	collection.Search(newValue)
})

watch(() => searchModel.value, (newValue) => {
	if (!!newValue) {
		const result = collection.searchResults.find(s => s.movieDbId == newValue)

		if (!!result?.title) {
			collection.setSelectedSearchItem(result)
		} else {
			console.error(`Error finding search result for movieDbId ${newValue}`)
			collection.clearSearchData()
		}
		emit('onSearch')
	}
})

watch(() => collection.selectedSearch, (newValue) => {
	// clear our local value when the store updates
	if (!newValue?.title) {
		searchModel.value = undefined
		search.value = ''
	}
})

</script>

<style scoped lang="scss">
.scroll {
	overflow-y: auto;
	height: 100%;
}

.search__list-item {
	display: inline-block;
	vertical-align: middle;
	width: 100%;
	padding: 0;
}
</style>