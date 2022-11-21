<template>
	<v-menu v-model="modelValue" :open-delay="0" :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<v-btn icon v-bind="props">
				<!-- SHOW WHAT'S SELECTED -->
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
		</template>

		<v-card min-width="300" class="py-2">

			<v-btn @click="clearPersonalFilters" rounded :text="!isUnfiltered" variant="text">
				Clear Personal Filters
			</v-btn>

			<v-divider class="mt-2"></v-divider>

			<v-list-item>
				<v-list-item-title>
					<v-btn :active="isUnfiltered" @click="toggleFavorites()" rounded :text="!isUnfiltered"
						variant="text">
						Favorites
					</v-btn>
				</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>
					<v-btn :active="isUnfiltered" @click="toggleWatched()" rounded :text="!isUnfiltered" variant="text">
						To Do
					</v-btn>
				</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>
					<v-btn :active="isUnfiltered" @click="toggleUpNext()" rounded :text="!isUnfiltered" variant="text">
						Up Next
					</v-btn>
				</v-list-item-title>
			</v-list-item>

		</v-card>
	</v-menu>
</template>



<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'

const store = useMainStore()
const filter = useFilterStore()

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
})

const emit = defineEmits(['update:modelValue'])

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext && !filter.filterToTv && !filter.filterToMovies
})

const clearPersonalFilters = () => {
	// filter.toggleUpNext()
	emit('update:modelValue', false)
}

const toggleFavorites = () => {
	filter.toggleFavorites()
	emit('update:modelValue', false)
}

const toggleWatched = () => {
	filter.toggleWatched()
	emit('update:modelValue', false)
}

const toggleUpNext = () => {
	filter.toggleUpNext()
	emit('update:modelValue', false)
}

</script>

<style scoped lang="scss">
@import '@/assets/colors';
</style>
