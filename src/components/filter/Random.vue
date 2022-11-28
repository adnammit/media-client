<template>
	<v-btn icon @click="surprise">
		<v-icon>mdi-dice-5</v-icon>
		<v-tooltip activator="parent" location="top">Select a random item from your collection</v-tooltip>
	</v-btn>
</template>

<script setup lang="ts">
import { useCollectionStore } from '@/store/collection'

const collection = useCollectionStore()

const surprise = () => {
	collection.setRandomUserTitle()
}

</script>