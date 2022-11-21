<template>
	<v-rating v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)">
		<template v-slot:item="props">
			<v-icon :color="props.isFilled ? 'pink' : 'blue lighten-3'" @click="updateRating(props)">{{ props.isFilled ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
		</template>
	</v-rating>
</template>

<script setup lang="ts">

const props = defineProps({
	modelValue: {
		type: Number,
		required: true
	},
})

const emit = defineEmits(['update:modelValue'])

const updateRating = (props: any) => {
	const rating = props.index + 1
	rating.value = rating.value == props.value ? 0 : rating;
}

</script>

<style scoped lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/main';
</style>
