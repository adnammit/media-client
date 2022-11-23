<template>
	<v-menu v-model="value" location="bottom" :open-delay="0" :close-on-content-click="false">

		<template v-slot:activator="{ props }">
			<v-row>
				<v-col cols="12">
					<v-btn rounded v-bind="props" variant="text" width="100%">
						Showing {{ selected }}
					</v-btn>
				</v-col>
			</v-row>
		</template>

		<v-card min-width="300" class="py-2">

			<v-row class="mx-4">
				<v-col cols="12">
					<v-btn @click="clearPersonalFilters()" rounded variant="text" :text="!isUnfiltered">
						Clear Personal Filters
					</v-btn>
				</v-col>
			</v-row>

			<v-divider class="my-2"></v-divider>

			<v-row class="mx-4">
				<v-col cols="12">
					<v-btn :active="filter.filterByFavorite" @click="toggleFavorites()" rounded :text="!filter.filterByFavorite"
						variant="text">
						Favorites
					</v-btn>
				</v-col>
			</v-row>

			<v-row class="mx-4">
				<v-col cols="12">
					<v-btn :active="filter.filterByWatched" @click="toggleWatched()" rounded :text="!filter.filterByWatched" variant="text">
						Unwatched
					</v-btn>
				</v-col>
			</v-row>

			<v-row class="mx-4">
				<v-col cols="12">
					<v-btn :active="filter.filterByUpNext" @click="toggleUpNext()" rounded :text="!filter.filterByUpNext" variant="text">
						Up Next
					</v-btn>
				</v-col>
			</v-row>

		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFilterStore } from '@/store/filter'

const filter = useFilterStore()

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
	get() {
		return props.modelValue
	},
	set(val: Boolean) {
		emit('update:modelValue', val)
	}
})

const selected = computed(() => {
	return isUnfiltered.value ? 'All Your Picks'
		: filter.filterByFavorite ? 'Favorites'
			: filter.filterByUpNext ? 'UpNext'
				: filter.filterByWatched ? 'Unwatched'
					: 'All'
})

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext
})

const clearPersonalFilters = () => {
	filter.resetPersonalFilters()
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
