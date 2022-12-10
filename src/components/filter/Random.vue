<template>
	<v-btn icon @click="surprise" :disabled="disabled" variant="text">
		<v-icon>mdi-dice-5</v-icon>
		<v-tooltip activator="parent" location="top">Can't decide what to watch? Let us pick</v-tooltip>
	</v-btn>

	<v-overlay :model-value="showCountdown" scrim="#666" class="align-center justify-center">
		<v-btn variant="flat" text="">
			<template v-slot:prepend>
				<span class="spinner">
					<v-icon>{{ icon }}</v-icon>
				</span>
			</template>
			Cooking up your random selection...
		</v-btn>
	</v-overlay>

</template>

<script setup lang="ts">
import { useCollectionStore } from '@/store/collection'
import { computed, onMounted, ref } from 'vue'

const collection = useCollectionStore()
const showCountdown = ref(false)

const icons = [
	'mdi-dice-1',
	'mdi-dice-2',
	'mdi-dice-3',
	'mdi-dice-4',
	'mdi-dice-5',
	'mdi-dice-6',
]

let iconIndex = 0
const icon = ref(icons[0])
const disabled = computed(() => {
	return collection.filteredCollection.length == 0
})

const iconTraverse = () => {

	if (iconIndex < icons.length - 1) {
		iconIndex++
	} else {
		iconIndex = 0
	}

	icon.value = icons[iconIndex]
}

const surprise = async () => {

	showCountdown.value = true

	function timeout(ms: any) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
	await timeout(2100)

	showCountdown.value = false

	collection.setRandomUserTitle()
}

onMounted(() => {
	window.setInterval(iconTraverse, 300)
})

</script>

<style scoped lang="scss">
@import '@/assets/main';
</style>


