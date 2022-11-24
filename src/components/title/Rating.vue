<template>

		<v-rating v-model="rating" hover>
		</v-rating>

	<!-- <v-rating v-model="modelValue" hover @input="$emit('update:modelValue', $event.target.value)">
		<template v-slot:item="props">
			<v-icon :color="props.isFilled ? 'pink' : 'blue lighten-3'" @click="updateRating(props)">{{ props.isFilled ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
		</template>
	</v-rating> -->
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: Number,
		required: true
	},
})

const emit = defineEmits(['update:modelValue'])

const rating = computed({
	get() {
		return props.modelValue
	},
	set(val: Boolean) {
		emit('update:modelValue', val)
	}
})

// const updateRating = (props: any) => {
// 	let rating = props.index + 1
// 	rating = rating == props.value ? 0 : rating;
// }

</script>

<style scoped lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/main';
</style>
