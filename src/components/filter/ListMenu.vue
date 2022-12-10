<template>

	<v-btn icon @click.stop="value = !value" variant="text">
		<v-icon :color="isAnyListSelected ? `secondary` : ``">mdi-playlist-star</v-icon>
		<v-tooltip activator="parent" location="top">Your Lists</v-tooltip>
	</v-btn>

	<NavigationDrawer v-model="value" :title="`Your Lists`" :buttons="buttons">
		<!-- TODO might need to move v-if down? -->
		<template v-slot:content v-if="hasLists">
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
		</template>
	</NavigationDrawer>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCollectionStore } from '@/store/collection'
import type MediaList from '@/models/mediaList'
import type { Button } from '@/models/button'
import NavigationDrawer from '@/components/filter/NavigationDrawer.vue'

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

const buttons: Button[] = [
	{
		text: `Add List`,
		onClick: () => { addList() },
		isDisabled: () => { return false },
		prependIcon: 'mdi-plus'
	},
	{
		text: `Clear Selection`,
		onClick: () => { clearSelection() },
		isDisabled: () => { return !isAnyListSelected.value },
		prependIcon: undefined
	},
]

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