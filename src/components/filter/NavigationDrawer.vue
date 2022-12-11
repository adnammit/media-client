<template>
	<v-navigation-drawer v-model="value" class="filter-bar__spacer" scrim :width="width" :id="id" :location="location">

		<v-card class="pa-4 h-100">

			<v-row>
				<v-col cols="auto" class="vertical-center">
					<div class="text-overline-lg">
						{{ title }}
					</div>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="auto">
					<v-btn icon @click="value = false" variant="flat">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12">
					<slot name="content"></slot>
				</v-col>
			</v-row>

			<template v-if="hasActions">
				<v-divider class="my-4"></v-divider>
				<v-card-actions v-for="button in props.buttons">
					<v-row>
						<v-col cols="12">
							<v-btn rounded variant="outlined" @click="button.onClick" width="100%"
								:disabled="button.isDisabled()" :prepend-icon="button.prependIcon">
								{{ button.text }}
							</v-btn>
						</v-col>
					</v-row>
				</v-card-actions>
			</template>

		</v-card>

	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from 'vue'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import type { Button } from '@/models/button'

const { name } = useDisplay()

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
	},
	location: {
		type: String as PropType<'end' | 'start' | 'left' | 'bottom' | 'right'>,
		default: 'start'
	}
})

const emit = defineEmits(['update:modelValue'])

// TODO can't find a plugin for unique component ids that supports ts/vue3 so we'll just get away with this for now...
const id = Math.ceil(Math.random() * 1000000)

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

const isVerySmallScreen = computed(() => {
	return name.value == 'xs'
})

const width = computed(() => {
	return isVerySmallScreen.value ? '300' : '500'
})

// 'temporary' attribute doesn't seem to work so here is a listener to close the nav drawer via brute force
onMounted(() => {
	const navigation = document.getElementById(id.toString())
	document.addEventListener('mouseup', function (e) {
		if (navigation?.contains(e.target as HTMLElement)) return
		value.value = false
	});
})

</script>

<style scoped lang="scss">
@import '@/assets/main.scss';
</style>
