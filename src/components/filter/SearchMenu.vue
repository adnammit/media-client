<template>
	<v-menu v-model="value" :open-delay="0" :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<v-btn icon v-bind="props">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</template>
		<v-card min-width="300" class="pa-4">
			<v-row>
				<v-col cols="12">
					<Search @on-search="$emit('update:modelValue', false)" />
				</v-col>
			</v-row>
		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useCollectionStore } from '@/store/collection'
import Search from '@/components/filter/Search.vue'

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