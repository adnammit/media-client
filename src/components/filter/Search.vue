<template>
	<v-autocomplete v-model="searchModel" :items="collection.searchResults" :loading="collection.isSearching"
		v-model:search="search" clearable hide-details item-title="title" item-value="movieDbId"
		label="Add to your collection..." dense variant="underlined" class="search-bar pr-4">
		<template v-slot:no-data>
			<v-list-item>
				<v-list-item-title>
					Search for movie and show titles
				</v-list-item-title>
			</v-list-item>
		</template>

		<template v-slot:item="{ props, item }">
			<!-- TODO display genre, maybe pic? -->
			<v-list-item v-bind="props" :title="item.raw.title" :subtitle="item.raw.releaseYear">
			</v-list-item>
		</template>
	</v-autocomplete>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCollectionStore } from '@/store/collection'

const emit = defineEmits(['onSearch'])

const collection = useCollectionStore()

const searchModel = ref<number|undefined>(undefined)
const search = ref('')

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