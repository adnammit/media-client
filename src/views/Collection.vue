<template>
	<PageLayout>

		<FilterBarMobile v-if="isMobile" />
		<FilterBar v-else />

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

		<AddSearch v-model="addSearchDialog" />
		<UpdateTitle v-model="updateTitleDialog" />

	</PageLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch, type Ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import { useCollectionStore } from '@/store/collection'
import type Title from '@/models/title'
import PageLayout from '@/components/navigation/PageLayout.vue'
import FilterBar from '@/components/filter/FilterBar.vue'
import FilterBarMobile from '@/components/filter/FilterBarMobile.vue'
import Loader from '@/components/Loader.vue'
import CollectionItemDisplay from '@/components/title/CollectionItemDisplay.vue'
import AddSearch from '@/components/title/AddSearch.vue'
import UpdateTitle from '@/components/title/UpdateTitle.vue'

const store = useMainStore()
const filter = useFilterStore()
const collection = useCollectionStore()
const { name } = useDisplay()

const title = `My Collection`
const subtitle = `Browse what's UpNext`
const smallScreens = ['xs', 'sm']
const addSearchDialog = ref(false)
const updateTitleDialog = ref(false)

const isMobile = computed(() => {
	return smallScreens.includes(name.value)
})

const noData = computed(() => {
	return collection.collection.length == 0
})

const noResults = computed(() => {
	return filteredCollection.value.length == 0
})

const filteredCollection = computed(() => {
	// hack to make sure filteredCollection is updated when direction changes
	filter.criteria.direction
	collection.collection
	return filter.criteria.SortAndFilterTitles(collection.collection)
})

const selectTitleUpdate = (title: Title) => {
	collection.setSelectedUserTitle(title)
	updateTitleDialog.value = true
}

onBeforeMount(() => {
	collection.loadCollection()
})

watch(() => collection.selectedSearch, (newValue) => {
	if (!!newValue?.title) {
		addSearchDialog.value = true
	}
})

</script>
