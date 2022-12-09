<template>
	<PageLayout>
		<v-container fluid class="pa-0 px-2 mx-0">

			<FilterBar />

			<v-container fluid class="filter-bar__spacer">

				<Overlay v-model="errorModel" :text="errorMessage" icon="mdi-alert-circle-outline" color="error" />

				<!-- can we merge listView and collection? -->

				<ListView v-if="showList" />

				<CollectionView v-else />

				<TitleDetail v-model="updateTitleDialog" :title="collection.selectedUserTitle" :is-delete-enabled="true"
					@save-title-data="(data, id) => collection.updateUserItem(id, data)"
					@delete-title="(id) => collection.deleteUserItem(id)"
					@clear-selection-data="collection.clearUserTitleData()" />

				<TitleDetail v-model="addSearchDialog" :title="collection.selectedSearch" :is-delete-enabled="false"
					@save-title-data="(data) => collection.addUserItem(data)"
					@clear-selection-data="collection.clearSearchData()" />

				<!-- ADD NEW LIST -->
				<!-- <ListDetail v-model="listDetailDialog" :list="collection.selectedList" :is-delete-enabled="true"
			@save-title-data="(data, id) => collection.updateUserItem(id, data)"
			@delete-title="(id) => collection.deleteUserItem(id)"
			@clear-selection-data="collection.clearUserTitleData()" /> -->

			</v-container>
		</v-container>
	</PageLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useMainStore } from '@/store'
import { useCollectionStore } from '@/store/collection'
import PageLayout from '@/components/navigation/PageLayout.vue'
import FilterBar from '@/components/filter/FilterBar.vue'
import Overlay from '@/components/Overlay.vue'
import CollectionView from '@/components/CollectionView.vue'
import ListView from '@/components/ListView.vue'
import TitleDetail from '@/components/title/TitleDetail.vue'
import ListDetail from '@/components/title/ListDetail.vue'

const store = useMainStore()
const collection = useCollectionStore()

const addSearchDialog = ref(false)
const updateTitleDialog = ref(false)
const listDetailDialog = ref(false)

const errorMessage = computed(() => {
	return !!store.errorMessage ? store.errorMessage : `Error`
})

const showList = computed(() => {
	return !!collection.selectedList?.name
})

const errorModel = computed({
	get() {
		return store.isErrored
	},
	set(val: boolean) {
		if (!val) {
			store.setIsErrored(false, '')
		}
	}
})

onBeforeMount(() => {
	collection.loadCollection()
})

watch(() => collection.selectedSearch, (newValue) => {
	if (!!newValue?.title) {
		addSearchDialog.value = true
	}
})

watch(() => collection.selectedUserTitle, (newValue) => {
	if (!!newValue?.title) {
		updateTitleDialog.value = true
	}
})

</script>

<style scoped lang="scss">
@import '@/assets/colors';

.filter-bar__spacer {
	margin-top: 45px;
}
</style>
