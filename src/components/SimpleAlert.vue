<template>
	<v-dialog v-model="modelValue" class="modal-contents" max-width="600">
		<v-card fill>
			<v-form ref="form" @submit.prevent="$emit('confirmAlert')">
				<v-card-title>{{ titleText }}</v-card-title>

				<v-card-text>
					{{ messageText }}
				</v-card-text>
				<v-card-actions class="mt-12">
					<v-spacer></v-spacer>
					<v-btn @click.stop="$emit('cancelAlert')" variant="flat" :disabled="isLoading">{{ cancelText }}</v-btn>
					<v-btn color="secondary" type="submit" variant="flat" :disabled="isLoading" :loading="isLoading">{{ confirmText }}</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/'
import { computed } from 'vue'

const store = useMainStore()

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	titleText: {
		type: String,
		default: 'Alert!'
	},
	messageText: {
		type: String,
		default: 'This is an Alert'
	},
	confirmText: {
		type: String,
		default: 'OK'
	},
	cancelText: {
		type: String,
		default: 'Cancel'
	},
})

const emit = defineEmits(['confirmAlert', 'cancelAlert'])

// TODO: we should disable this when the user clicks submit
const isLoading = computed(() => {
	return store.isLoading
})

</script>


<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/modal';
</style>
