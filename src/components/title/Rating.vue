<template>
	<v-rating v-model="rating" @input="$emit('update:rating', $event.target.value)">
		<template v-slot:item="props">
			<v-icon :color="props.isFilled ? 'pink' : 'blue lighten-3'" @click="updateRating(props)">{{ props.isFilled ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
		</template>
	</v-rating>
</template>

<!--
<script setup lang="ts">
defineProps<{
	value: number
}>()

const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
	emit('submit')
}


</script> -->



<script lang="ts">
import { defineComponent } from 'vue'



export default defineComponent({
	props: {
		value: Number,
	},
	computed: {
		rating(): number {
			return this.value ?? 0
		},

		// private set rating(value: number) {
		// 	this.$emit('input', value);

	},
	methods: {
		updateRating(props: any) {
			const rating = props.index + 1
			this.rating = rating == this.value ? 0 : rating;
		}
	},
})


</script>

<style scoped lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/main';
</style>
