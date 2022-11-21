<template>
	<v-tooltip :text="text" location="top" open-delay="300">
		<template v-slot:activator="{ props }">
			<font-awesome-icon v-bind="props" :icon="icon" size="lg" />
		</template>
	</v-tooltip>
</template>

<script setup lang="ts">

const props = defineProps({
	icon: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
})

</script>