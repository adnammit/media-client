<template>
	<div class="container-fluid filter-bar ma-0 py-0 px-2">

		<v-toolbar border>

			<SearchMenu v-model="searchMenu" />

			<FindMenu v-model="findMenu" />

			<Random />

			<v-spacer></v-spacer>

			<SortMenu v-model="sortMenu" />

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
import SearchMenu from '@/components/filter/SearchMenu.vue'
import FindMenu from '@/components/filter/FindMenu.vue'
import Random from '@/components/filter/Random.vue'
import SortMenu from '@/components/filter/SortMenu.vue'
import PersonalFilterMenu from '@/components/filter/PersonalFilterMenu.vue'
import MediaFilterMenu from '@/components/filter/MediaFilterMenu.vue'

const filter = useFilterStore()

const searchMenu = ref(false)
const findMenu = ref(false)
const sortMenu = ref(false)
const filterMenu = ref(false)
const subMenuPersonal = ref(false)
const subMenuMedia = ref(false)

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext && !filter.filterToTv && !filter.filterToMovies
})

const resetFilter = () => {
	filter.resetFilter()
}

</script>

<style scoped lang="scss">
@import '@/assets/colors';

.filter-bar {
	width: 100%;
}
</style>
