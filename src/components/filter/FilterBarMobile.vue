<template>
	<div class="container-fluid filter-bar ma-0 py-0 px-2">

		<v-toolbar border>

			<v-spacer></v-spacer>

			<!-- SEARCH! -->
			<v-menu v-model="searchMenu" :open-delay="0" :close-on-content-click="false">
				<template v-slot:activator="{ props }">
					<v-btn icon v-bind="props">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</template>
				<v-card min-width="300" class="pa-4">
					<v-row>
						<v-col cols="12">
							<Search @on-search="closeSearch()" />
						</v-col>
					</v-row>
				</v-card>
			</v-menu>

			<!-- TODO: add sort -->

			<!-- FILTER! -->
			<v-menu v-model="filterMenu" :open-delay="0" :close-on-content-click="false">
				<template v-slot:activator="{ props }">
					<v-btn icon v-bind="props">
						<v-icon>mdi-tune</v-icon>
					</v-btn>
				</template>

				<v-card min-width="300" class="pa-4">

					<v-row>
						<v-col cols="12">
							<v-btn :active="isUnfiltered" @click="resetFilter()" rounded :text="!isUnfiltered"
								variant="text" width="100%">Show All</v-btn>
						</v-col>
					</v-row>

					<PersonalFilterMenu v-model="subMenuPersonal" />
					<MediaFilterMenu v-model="subMenuMedia" />

					<!-- TODO: add search in collection -->

					<v-card-actions>
						<v-row>
							<v-col cols="12">
								<v-btn rounded variant="outlined" @click="filterMenu = false" width="100%">
									Close Filter
								</v-btn>
							</v-col>
						</v-row>

					</v-card-actions>
				</v-card>

			</v-menu>

		</v-toolbar>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFilterStore } from '@/store/filter'
import Search from '@/components/filter/Search.vue'
import PersonalFilterMenu from '@/components/filter/PersonalFilterMenu.vue'
import MediaFilterMenu from '@/components/filter/MediaFilterMenu.vue'

const filter = useFilterStore()

const searchMenu = ref(false)
const filterMenu = ref(false)
const subMenuPersonal = ref(false)
const subMenuMedia = ref(false)

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext && !filter.filterToTv && !filter.filterToMovies
})

const closeSearch = () => {
	searchMenu.value = false
}

const resetFilter = () => {
	filter.resetFilter()
}

const surprise = () => {
	window.alert('Surprise!')
}

</script>

<style scoped lang="scss">
@import '@/assets/colors';

.filter-bar {
	width: 100%;
}
</style>
