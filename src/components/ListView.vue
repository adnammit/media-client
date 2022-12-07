<template>

	<div class="text-h2 mt-6">
		{{ title }}
	</div>
	<div class="text-body-1">
		{{ subtitle }}
	</div>

	<template v-if="store.isLoading">
		<Loader />
	</template>

	<div v-else-if="noData" class="text-center py-7 my-9">
		<div class="font-weight-thin text-h5">
			There's nothing in your collection yet
		</div>
		<div class="font-weight-light text-h3">
			<br />
			<v-icon icon="mdi-sail-boat" size="x-large" class="mb-5"></v-icon>
		</div>
		<div class="text-overline font-weight-light">Search for a title to start</div>
	</div>

	<div v-else-if="noResults" class="text-center py-9 my-9" height="500px">
		<div class="font-weight-thin text-h5">
			No results to show
		</div>
		<div class="my-3">
			<!-- idk just messin -->
			<v-icon icon="mdi-moon-waning-crescent" size="medium"></v-icon>
			<v-icon icon="mdi-moon-last-quarter" size="medium"></v-icon>
			<v-icon icon="mdi-moon-waning-gibbous" size="medium"></v-icon>
			<v-icon icon="mdi-moon-full" size="medium"></v-icon>
			<v-icon icon="mdi-moon-waxing-gibbous" size="medium"></v-icon>
			<v-icon icon="mdi-moon-first-quarter" size="medium"></v-icon>
			<v-icon icon="mdi-moon-waxing-crescent" size="medium"></v-icon>
		</div>
		<div class="text-overline font-weight-light">Clear the filter and try again</div>
	</div>

	<v-container v-else>
		<v-row class="mx-1">
			<v-col v-for="(item, index) in filteredCollection" :key="item.id" cols="12" sm="6" md="3" xl="2">
				<CollectionItemDisplay :title="item" @select-title-update="selectTitleUpdate" />
			</v-col>
		</v-row>
	</v-container>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '@/store'
import { useCollectionStore } from '@/store/collection'
import type Title from '@/models/title'
import Loader from '@/components/Loader.vue'
import CollectionItemDisplay from '@/components/title/CollectionItemDisplay.vue'

// START HERE: do list view stuff

const store = useMainStore()
const collection = useCollectionStore()

const title = `My Collection`
const subtitle = `Browse what's UpNext`

const noData = computed(() => {
	return collection.collection.length == 0
})

const noResults = computed(() => {
	return filteredCollection.value.length == 0
})

const filteredCollection = computed(() => {
	return collection.filteredCollection
})

const selectTitleUpdate = (title: Title) => {
	collection.setSelectedUserTitle(title)
}

</script>
