<template>
	<v-menu v-model="value" :open-delay="0" :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<v-btn icon v-bind="props">
				<v-icon :color="isSearchActive ? `secondary` : ``">mdi-magnify</v-icon>
			</v-btn>
		</template>
		<v-card min-width="300" class="pa-4">
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="search" label="Search your collection" variant="outlined" autofocus></v-text-field>
				</v-col>
			</v-row>
			<v-card-actions>
				<v-row>
					<v-col cols="12">
						<v-btn rounded variant="outlined" @click="clearSearch" width="100%" :disabled="!isSearchActive">
							Clear Search
						</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>
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

const search = computed({
	get() {
		return filter.globalSearch
	},
	set(val: Boolean) {
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