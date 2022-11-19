<template>
	<PageLayout>

		<FilterBar />

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
				<v-col v-for="(item, index) in store.filteredCollection" :key="item.id" cols="12" sm="6" md="3" xl="2">
					<CollectionItemDisplay :title="item.title" :summary="item.summary" :poster="item.poster"
						:releaseDate="item.releaseDate" />
				</v-col>
			</v-row>
		</v-container>

			<v-row justify="center">
				<v-dialog v-model="dialog" persistent>
					<!-- <template v-slot:activator="{ props }">
						<v-btn color="primary" v-bind="props">
							Open Dialog
						</v-btn>
					</template> -->
					<v-card>
						<v-card-title class="text-h5">
							Use Google's location service?
						</v-card-title>
						<v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google,
							even when no apps are running.</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green-darken-1" variant="text" @click="sayHello()">
								Disagree
							</v-btn>
							<v-btn color="green-darken-1" variant="text" @click="sayHello">
								Agree
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>

		<!-- <SearchDetail :dialog="dialog" @close-dialog="closeDialog" /> -->
		<!-- <SearchDetail v-model="filter.showSelectedItem"/> -->
		<!-- <SearchDetail :dialog.sync="showSelectedItemDetail" @close-dialog="() => closeDetail" /> -->

	</PageLayout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import PageLayout from '@/components/navigation/PageLayout.vue'
import FilterBar from '@/components/FilterBar.vue'
import Loader from '@/components/Loader.vue'
import CollectionItemDisplay from '@/components/CollectionItemDisplay.vue'
import SearchDetail from '@/components/SearchDetail.vue'

const store = useMainStore()
const filter = useFilterStore()

const title = `My Collection`
const subtitle = `Browse what's UpNext`

// let dialog = false
const dialog = ref(false)

// const dialog = computed(() => {
// 	return filter.showSelectedItem
// })
// const dialog = computed({
// 	get: () => filter.showSelectedItem,
// 	set: (val) => {
// 		filter.setShowSelectedItem(val)
// 	}
// })

const sayHello = () => {
	console.log('>> HELLO alert ');
	// alert.value = true
	// dialog.value = false
}


const noData = computed(() => {
	return store.collection.length == 0
})

const noResults = computed(() => {
	return store.filteredCollection.length == 0
})

const closeDialog = () => {
	console.log('>> emitted close');
	filter.clearSearchData()
}

onBeforeMount(() => {
	store.loadCollection()
})



watch(() => filter.showSelectedItem, (newValue) => {
	console.log('>> watching ' + newValue);
	// dialog.value = newValue
	if (newValue) {
		dialog.value = true
	}
})


// const closeDialog = () => {
// 	// dialog.value = false
// 	// filter.clearSearchData()
// 	// filter.setShowSelectedItem(false)

// 	// emit('update:dialog', false)
// 	emit('closeDialog')

// }

// const closeAlert = () => {
// 	// console.log('>> closing with ' + JSON.stringify(val));
// 	alert.value = false
// }

// const closeAlertWithConfirm = () => {
// 	// console.log('>> closing with ' + JSON.stringify(val));
// 	alert.value = false
// 	closeDialog()
// }

const confirmDiscard = () => {
	console.log('>> activating alert ');
	// alert.value = true
}



const save = async () => {
	//// DO SAVE
	console.log('>> SAVING');
	const item = Object.assign(filter.selectedItem)
	// item.queued = this.queued
	// item.favorite = this.favorite
	// item.watched = this.watched
	// item.rating = this.rating
	await store.addUserItem(item)
	closeDialog()
}

</script>





// export default defineComponent({
// 	name: 'Collection',
// 	components: { PageLayout, FilterBar, Loader, CollectionItemDisplay, SearchDetail },
// 	computed: {
// 		title(): string {
// 			return 'My Collection'
// 			// return `${this.mainStore.filterSubject == '' ? 'The' : this.mainStore.filterSubject} Feed`;
// 		},
// 		subtitle(): string {
// 			return `Browse what's UpNext`
// 			// return `All the latest in ${this.mainStore.filterSubject == '' ? 'Cowpoke' : this.mainStore.filterSubject} news!`
// 		},
// 		isLoading(): boolean {
// 			return this.mainStore.isLoading
// 		},
// 		noData(): boolean {
// 			// are any items saved at all
// 			return this.mainStore.collection.length == 0
// 		},
// 		noResults(): boolean {
// 			// are there any filtered results
// 			return this.filteredContent.length == 0
// 		},
// 		filteredContent(): Title[] {
// 			return this.mainStore.filteredCollection
// 		},

// 	},
// 	setup() {
// 		const mainStore = useMainStore()
// 		const filterStore = useFilterStore()
// 		return { mainStore, filterStore }
// 	},
// 	created() {
// 		this.mainStore.loadCollection()
// 	}
// })
