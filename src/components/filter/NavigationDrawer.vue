<template>
	<v-navigation-drawer v-model="value" temporary class="filter-bar__spacer" width="300">

		<v-card class="pa-4 h-100">

			<!-- hack because temporary on the nav drawer isn't working -->
			<v-btn icon @click="value = false">
				<v-icon>mdi-close</v-icon>
			</v-btn>

			<template v-if="!!props.title">
				<v-row>
					<v-col cols="12">
						<div class="text-button">
							{{ title }}
						</div>
					</v-col>
				</v-row>

				<v-divider class="my-2"></v-divider>

			</template>

			<!-- render content -->
			<v-row>
				<v-col cols="12">
					<slot name="content">
						hello
					</slot>
				</v-col>
			</v-row>

			<!-- if actions, render actions -->
			<template v-if="hasActions">
				<v-card-actions v-for="button in props.buttons">
					<v-row>
						<v-col cols="12">
							<v-btn rounded variant="outlined" @click="button.onClick" width="100%" :disabled="button.isDisabled()" :prepend-icon="button.prependIcon">
								{{ getButtonText(button.text) }}
							</v-btn>
						</v-col>
					</v-row>
				</v-card-actions>
			</template>

		</v-card>

	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { Button } from '@/models/button'

const slots = useSlots()

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	title: {
		type: String,
		default: undefined
	},
	buttons: {
		type: Array<Button>,
		default: undefined
	}

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

const hasActions = computed(() => {
	return !!props.buttons && props.buttons.length > 0
})

const getButtonText = (text: string | (() => string) ) => {
	// TODO: this doesn't update dynamically
	if (typeof(text) == 'string') {
		return text
	}
	return text()
}

</script>

<style scoped lang="scss">
@import '@/assets/main.scss';
</style>
