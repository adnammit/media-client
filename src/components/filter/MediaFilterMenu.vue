<template>
	<v-menu v-model="modelValue" location="bottom" :open-delay="0" :close-on-content-click="false">

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
					<v-btn @click="clearMediaFilters()" rounded variant="text" :text="!isUnfiltered">
						Clear Media Filters
					</v-btn>
				</v-col>
			</v-row>

			<v-divider class="my-2"></v-divider>

			<v-row class="mx-4">
				<v-col cols="12">
					<v-btn :active="filter.filterToMovies" @click="toggleMovies()" rounded
						:text="!filter.filterToMovies" variant="text">
						Movies
					</v-btn>
				</v-col>
			</v-row>

			<v-row class="mx-4">
				<v-col cols="12">
					<v-btn :active="filter.filterToTv" @click="toggleTv()" rounded :text="!filter.filterToTv"
						variant="text">
						TV
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

const selected = computed(() => {
	return isUnfiltered.value ? 'Movies and TV'
		: filter.filterToMovies ? 'Movies'
			: filter.filterToTv ? 'TV'
				: 'All'
})

const isUnfiltered = computed(() => {
	return !filter.filterToMovies && !filter.filterToTv
})

const clearMediaFilters = () => {
	filter.resetMediaFilters()
	emit('update:modelValue', false)
}

const toggleMovies = () => {
	filter.toggleMovies()
	emit('update:modelValue', false)
}

const toggleTv = () => {
	filter.toggleTv()
	emit('update:modelValue', false)
}

</script>

<style scoped lang="scss">
@import '@/assets/colors';
</style>
