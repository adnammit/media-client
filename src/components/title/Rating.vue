<template>
	<v-rating v-model="rating" @input="$emit('update:rating', $event.target.value)">
		<template v-slot:item="props">
			<v-icon :color="props.isFilled ? 'pink' : 'blue lighten-3'" @click="updateRating(props)">{{ props.isFilled ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
		</template>
	</v-rating>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	value: Number,
})

// const rating = computed(() => {
// 	return props.value ?? 0

// })

const rating = computed({
	get: () => props.value ?? 0,
	set: (val) => {
		// emit val
	}
})

const updateRating = (props: any) => {
	const rating = props.index + 1
	rating.value = rating.value == props.value ? 0 : rating;
}

</script>

<style scoped lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/main';
</style>
