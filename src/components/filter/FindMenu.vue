<template>

	<v-btn icon @click.stop="value = !value">
		<v-icon :color="isSearchActive ? `secondary` : ``">mdi-magnify</v-icon>
	</v-btn>

	<NavigationDrawer v-model="value" :buttons="buttons">
		<template v-slot:content>
			<v-text-field v-model="search" label="Search your collection" variant="outlined" autofocus></v-text-field>
		</template>
	</NavigationDrawer>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFilterStore } from '@/store/filter'
import type { Button } from '@/models/button'
import NavigationDrawer from '@/components/filter/NavigationDrawer.vue'

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

const buttons: Button[] = [
	{
		text: `Clear Search`,
		onClick: () => { clearSearch() },
		isDisabled: () => { return !isSearchActive },
		prependIcon: undefined
	},
]

const search = computed({
	get() {
		return filter.globalSearch
	},
	set(val: String) {
		filter.setGlobalSearch(val)
	}
})

const isSearchActive = computed(() => {
	return !!filter.globalSearch
})

const clearSearch = () => {
	search.value = ''
	emit('update:modelValue', false)
}

</script>