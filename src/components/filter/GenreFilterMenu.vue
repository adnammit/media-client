<template>
	<v-menu v-model="value" location="bottom" :open-delay="0" :close-on-content-click="false">

		<template v-slot:activator="{ props }">
			<v-row>
				<v-col cols="12">
					<v-btn :active="!isUnfiltered" rounded v-bind="props" variant="text" width="100%">
						{{ selected }}
					</v-btn>
				</v-col>
			</v-row>
		</template>

		<v-card min-width="300" class="py-2">

			<v-row class="mx-4">
				<v-col cols="12">
					<v-btn @click="clearGenreFilter()" rounded variant="outlined" :text="!isUnfiltered">
						Clear Genre Filters
					</v-btn>
				</v-col>
			</v-row>

			<v-divider class="my-2"></v-divider>

			<template v-for="item in genres">
				<v-row class="mx-4">
					<v-col cols="12">
						<v-btn :active="isFilteredBy(item)" @click="setGenreFilter(item)" rounded
							:text="!isFilteredBy(item)" variant="text">
							{{ item.name }}
						</v-btn>
					</v-col>
				</v-row>
			</template>

		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFilterStore } from '@/store/filter'
import { genres, type GenreItem } from '@/helpers/genre'

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

const maxHeight = `70vh`

const selected = computed(() => {
	return isUnfiltered.value ? 'Showing All Genres'
		: filter.genreFilter.name
})

const isUnfiltered = computed(() => {
	return !filter.genreFilter?.name
})

const isFilteredBy = (val: GenreItem) => {
	return filter.genreFilter?.name == val?.name
}

const clearGenreFilter = () => {
	filter.resetGenre()
	emit('update:modelValue', false)
}

const setGenreFilter = (val: GenreItem) => {
	filter.setGenre(val)
	emit('update:modelValue', false)
}

</script>

<style scoped lang="scss">
@import '@/assets/colors';
</style>
