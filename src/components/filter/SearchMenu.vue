<template>

	<v-btn icon @click.stop="value = !value" variant="text">
		<v-icon>mdi-plus</v-icon>
	</v-btn>

	<NavigationDrawer v-model="value">
		<template v-slot:content>
			<Search @on-search="$emit('update:modelValue', false)" />
		</template>
	</NavigationDrawer>

</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useCollectionStore } from '@/store/collection'
import Search from '@/components/filter/Search.vue'
import NavigationDrawer from '@/components/filter/NavigationDrawer.vue'

const collection = useCollectionStore()

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

watch(() => props.modelValue, (newValue) => {
	if (!newValue)
		collection.clearSearchResults()
})

</script>