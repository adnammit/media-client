<template>
	<div class="container-fluid filter-bar ma-0 py-0 px-2">
		<div>
			<v-toolbar border>
				<v-btn :active="isUnfiltered" @click="filter.resetFilter()" rounded :text="!isUnfiltered" variant="text">All
				</v-btn>
				<v-btn :active="filter.filterByFavorite" @click="filter.toggleFavorites()" rounded
					:text="!filter.filterByFavorite" variant="text">Favorites</v-btn>
				<v-btn :active="filter.filterByWatched" @click="filter.toggleWatched()" rounded :text="!filter.filterByWatched"
					variant="text">To Do</v-btn>
				<v-btn :active="filter.filterByUpNext" @click="filter.toggleUpNext()" rounded :text="!filter.filterByUpNext"
					variant="text">Up Next</v-btn>
				<v-btn :active="filter.filterToMovies" @click="filter.toggleMovies()" rounded :text="!filter.filterToMovies"
					variant="text">Movies</v-btn>
				<v-btn :active="filter.filterToTv" @click="filter.toggleTv()" rounded :text="!filter.filterToTv"
					variant="text">Tv</v-btn>

				<v-tooltip text="Select a Random Title" location="top" open-delay="300">
					<template v-slot:activator="{ props }">
						<v-btn @click="surprise" rounded text v-bind="props">
							<v-icon>mdi-dice-5</v-icon>
						</v-btn>
					</template>
				</v-tooltip>

				<v-spacer></v-spacer>

				<Search />

			</v-toolbar>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFilterStore } from '@/store/filter'
import Search from '@/components/filter/Search.vue'

const filter = useFilterStore()

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext && !filter.filterToTv && !filter.filterToMovies
})

const surprise = () => {
	window.alert('Surprise!')
}

</script>

<style scoped lang="scss">
@import '@/assets/colors';

.filter-bar {
	width: 100%;
}

.search-bar {
	max-width: 400px;
}
</style>
