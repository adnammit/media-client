<template>
	<v-autocomplete
			v-model="searchModel"
			v-model:search="search"
			:items="collection.searchResults"
			item-value="movieDbId"
			item-title="title"
			hide-no-data
			:loading="collection.isSearching"
			clearable hide-details autofocus dense
			label="Add to your collection..."
			variant="underlined"
			class="search-bar pr-4"
			>

		<template v-slot:item="{ props, item }">
			<v-row>
				<v-col align-self="center">
					<div class="search--list" v-bind="props">
						<v-img :src="getPosterUrl(item.raw)" class="search__list-item rounded-lg mx-3" cover
							:max-height="posterHeight" :max-width="posterHeight" :aspect-ratio="1">
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="grey lighten-5">
									</v-progress-circular>
								</v-row>
							</template>
						</v-img>
						<div class="search__list-item mr-2">
							{{ item.raw.title }}
							<div class="search__list-item__date text-body-2">
								{{ formatYear(item.raw.releaseDate) }}
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
		</template>
	</v-autocomplete>
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
	}
})

</script>

<style scoped lang="scss">
.search-bar {
	max-width: 400px;
}

.search--list {
	display: flex;
	align-items: center;
	width: 100%;
}

.search__list-item {
	display: inline-block;
	vertical-align: middle;
	width: 100%;
	padding: 0;
}

.search__list-item__date {
	display: block;
	padding: 0;
}

</style>