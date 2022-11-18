<template>
	<PageLayout>

		<FilterBar />

		<div class="text-h2 mt-6">
			{{ title }}
		</div>
		<div class="text-body-1">
			{{ subtitle }}
		</div>

		<template v-if="isLoading">
			<Loader />
		</template>

		<div v-else-if="noData" class="text-center py-7 my-9">
			<div class="font-weight-thin text-h5">
				There's nothing in your collection yet
			</div>
			<div class="font-weight-light text-h3">
				<br />
				<v-icon icon="mdi-sail-boat" size="x-large" class="mb-5"></v-icon>

				<!-- idk just messin -->
				<!-- <v-icon icon="mdi-moon-waning-crescent" size="medium"></v-icon>
									<v-icon icon="mdi-moon-last-quarter" size="medium"></v-icon>
									<v-icon icon="mdi-moon-waning-gibbous" size="medium"></v-icon>
									<v-icon icon="mdi-moon-full" size="medium"></v-icon>
									<v-icon icon="mdi-moon-waxing-gibbous" size="medium"></v-icon>
									<v-icon icon="mdi-moon-first-quarter" size="medium"></v-icon>
									<v-icon icon="mdi-moon-waxing-crescent" size="medium"></v-icon> -->
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

		<v-container v-else="hasCollection">
			<v-row class="mx-1">
				<v-col v-for="(item, index) in filteredContent" :key="item.id" cols="12" sm="6" md="3" xl="2">
					<CollectionItemDisplay :title="item.title" :summary="item.summary" :poster="item.poster"
						:released="item.released" />
				</v-col>
			</v-row>
		</v-container>

		<SearchDetail />
		<!-- <SearchDetail :dialog.sync="showSearchDetail" @close-dialog="() => closeDetail" /> -->

	</PageLayout>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import type Title from '@/models/title'
import PageLayout from '@/components/navigation/PageLayout.vue'
import FilterBar from '@/components/FilterBar.vue'
import Loader from '@/components/Loader.vue'
import CollectionItemDisplay from '@/components/CollectionItemDisplay.vue'
import SearchDetail from '@/components/SearchDetail.vue'

export default defineComponent({
	name: 'Collection',
	components: { PageLayout, FilterBar, Loader, CollectionItemDisplay, SearchDetail },
	// data() {
	// 	return {
	// 		showSearchDetail: false,
	// 	}
	// },
	// methods: {
	// 	closeSearchDetail() {
	// 		console.log('>> emitted close')
	// 		this.filterStore.toggleShowSearchDetail(false)
	// 		// console.log('>> closing search detail ' );
	// 		// this.showSearchDetail = false
	// 	}
	// },
	computed: {
		title(): string {
			return 'My Collection'
			// return `${this.mainStore.filterSubject == '' ? 'The' : this.mainStore.filterSubject} Feed`;
		},
		subtitle(): string {
			return `Browse what's UpNext`
			// return `All the latest in ${this.mainStore.filterSubject == '' ? 'Cowpoke' : this.mainStore.filterSubject} news!`
		},
		isLoading(): boolean {
			return this.mainStore.isLoading
		},
		noData(): boolean {
			// are any items saved at all
			return this.mainStore.collection.length == 0
		},
		noResults(): boolean {
			// are there any filtered results
			return this.filteredContent.length == 0
		},
		filteredContent(): Title[] {
			return this.mainStore.filteredCollection
		},
		// ...mapState(useFilterStore, ['showSearchDetail']),


		showSearchDetail(): boolean {
			console.log('>> showadditem ' + this.filterStore.showAddItem);
			return this.filterStore.showAddItem
			// return !!this.filterStore.selectedItem && this.filterStore.selectedItem.movieDbId > 0
		},

		closeDetail() {
			this.filterStore.toggleShowSearchDetail(false)
		}

	},
	// watch: {
	// 	useMainStore(val: boolean) {
	// 		console.log('>> showadditem ' + val);
	// 		this.showSearchDetail = val
	// 	},
	// },
	setup() {
		const mainStore = useMainStore()
		const filterStore = useFilterStore()

		// const { selectedItem } = storeToRefs(filterStore)
		// watch(selectedItem, handleUpdate)

		return { mainStore, filterStore }
	},
	created() {
		this.mainStore.loadCollection()
	}
})
</script>
