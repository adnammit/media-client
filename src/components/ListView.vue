<template>

	<v-hover>
		<template v-slot:default="{ isHovering, props }">
			<div v-bind="props" class="text-h2 mt-6">
				{{ title }}
				<v-btn icon @click="editList" variant="text" class="hidden" :class="{ 'shown': isHovering }">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</div>
		</template>
	</v-hover>

	<div class="text-body-1">
		{{ description }}
	</div>

	<template v-if="store.isLoading">
		<Loader />
	</template>

	<div v-else-if="noData" class="text-center py-7 my-9">
		<div class="font-weight-thin text-h5">
			There's nothing in your list yet
		</div>
		<div class="font-weight-light text-h3">
			<br />
			<v-icon icon="mdi-sail-boat" size="x-large" class="mb-5"></v-icon>
		</div>
		<div class="text-overline font-weight-light">Search for a title to start</div>
	</div>

	<v-container v-else>
		<v-row class="mx-1">
			<v-col v-for="(item, index) in items" :key="item.id" cols="12" sm="6" md="3" xl="2">
				<CollectionItemDisplay :title="item" @select-title-update="selectTitleUpdate" />
			</v-col>
		</v-row>
	</v-container>

	<ListDetail v-model="listDetailDialog" :list="collection.selectedList" :is-delete-enabled="true"
		@save-data="(data, id) => collection.updateUserList(data, id)" />
		<!-- @clear-data="collection.clearSelectedList()" /> -->

	<!-- TODO: show remaining collection items so you can add more -->

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMainStore } from '@/store'
import { useCollectionStore } from '@/store/collection'
import type Title from '@/models/title'
import Loader from '@/components/Loader.vue'
import CollectionItemDisplay from '@/components/title/CollectionItemDisplay.vue'
import ListDetail from '@/components/title/ListDetail.vue'

const store = useMainStore()
const collection = useCollectionStore()

const listDetailDialog = ref(false)

const title = computed(() => {
	return collection.selectedList.name
})

const description = computed(() => {
	return collection.selectedList.description
})

// TODO
const noData = computed(() => {
	return items.value.length == 0
})

const items = computed(() => {
	return collection.listItems
})

const selectTitleUpdate = (title: Title) => {
	collection.setSelectedUserTitle(title)
}

const editList = () => {
	listDetailDialog.value = true
	// TODO open list modal -- use same for 'add list'
	// collection.setSelectedUserTitle(title)
}

</script>

<style scoped lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/main';
</style>
