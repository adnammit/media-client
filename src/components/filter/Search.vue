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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCollectionStore } from '@/store/collection'

const collection = useCollectionStore()

const searchModel = ref<any>(null) // TODO: what is this type? -- number, but can it be object?
// const searchModel: any = null // TODO: what is this type?

const search = ref('')
// const search = ''

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