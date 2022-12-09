<template>
	<v-menu v-model="value" :open-delay="0" :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<v-btn icon v-bind="props">
				<v-icon :color="isAnyListSelected ? `secondary` : ``">mdi-playlist-star</v-icon>
				<v-tooltip activator="parent" location="top">Your Lists</v-tooltip>
			</v-btn>
		</template>

		<v-card min-width="300" class="pa-4">

			<template v-if="hasLists">
				<div class="menu__scroll">
					<template v-for="item in collection.lists">
						<v-row class="mx-0">
							<v-col cols="12">
								<v-btn :active="isListSelected(item.listId)" @click="selectList(item)" rounded
									:text="item.name" variant="text" width="100%">
									{{ item.name }}
								</v-btn>
							</v-col>
						</v-row>
					</template>
				</div>
				<v-divider class="my-2"></v-divider>
			</template>

			<v-row>
				<v-col cols="12">
					<v-btn rounded variant="outlined" @click="addList" width="100%" prepend-icon="mdi-plus">
						Add List
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-btn rounded variant="outlined" @click="clearSelection" width="100%"
						:disabled="!isAnyListSelected">
						Clear Selection
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCollectionStore } from '@/store/collection'
import type MediaList from '@/models/mediaList'
import ListDetail from '@/components/title/ListDetail.vue'

const collection = useCollectionStore()

const listDetailDialog = ref(false)

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

// TODO test no lists
const hasLists = computed(() => {
	return collection.lists.length > 0
})

const isAnyListSelected = computed(() => {
	return !!collection.selectedList?.name
})

const isListSelected = (listId: number) => {
	return collection.selectedList?.listId == (listId)
}

const selectList = (list: MediaList) => {
	collection.setSelectedList(list)
	emit('update:modelValue', false)
}

const addList = () => {
	listDetailDialog.value = true
	// TODO
	// search.value = ''
	// emit('update:modelValue', false)
}

const clearSelection = () => {
	collection.clearSelectedList()
	emit('update:modelValue', false)
}

</script>