<template>

	<v-btn icon @click.stop="value = !value" variant="text">
		<v-icon>mdi-swap-vertical</v-icon>
	</v-btn>

	<NavigationDrawer v-model="value" :title="`Sort Options`" :location="`end`">
		<template v-slot:content>
			<template v-for="item in items">
				<v-row class="mx-4">
					<v-col cols="12">
						<v-btn :active="isSortedBy(item.criteria)" @click="setSort(item.criteria)" rounded
							:text="!isSortedBy(item.criteria)" variant="text" :prepend-icon="getIcon(item)" width="100%">
							{{ item.description }}
						</v-btn>
					</v-col>
				</v-row>
			</template>
		</template>
	</NavigationDrawer>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFilterStore } from '@/store/filter'
import { SortCriteria, SortDirection } from '@/models/enum'
import NavigationDrawer from '@/components/filter/NavigationDrawer.vue'

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

const filter = useFilterStore()

const items = [
	{
		criteria: SortCriteria.Title,
		description: SortCriteria.Title.toString(),
	},
	{
		criteria: SortCriteria.Year,
		description: SortCriteria.Year.toString(),
	},
	{
		criteria: SortCriteria.UserRating,
		description: `Your Rating`,
	},
	{
		criteria: SortCriteria.PopularRating,
		description: `Popular Rating`,
	},
]

const isSortedBy = (criteria: SortCriteria) => {
	return filter.criteria.criteria == criteria
}

const getIcon = (item: any) => {
	if (isSortedBy(item.criteria)) {
		return filter.criteria.direction == SortDirection.Ascending ? 'mdi-arrow-up' : 'mdi-arrow-down'
	}
	else { return '' }
}

const setSort = (criteria: SortCriteria) => {
	if (filter.criteria.criteria == criteria) {
		filter.toggleSortDirection()
	} else {
		filter.setSortCriteria(criteria)
	}
}

</script>