<template>
	<v-overlay v-model="value" scrim="#666" class="align-center justify-center">
		<v-btn variant="flat" :prepend-icon="icon" :color="color">
			{{ text }}
		</v-btn>
	</v-overlay>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: false
	},
	color: {
		type: String,
		required: false
	}
})

const value = computed({
	get() {
		return props.modelValue
	},
	set(val: Boolean) {
		emit('update:modelValue', val)
	}
})

const emit = defineEmits(['update:modelValue'])

</script>

<style scoped lang="scss">
@import '@/assets/main';
</style>


