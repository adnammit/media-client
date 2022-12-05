<template>
	<div class="text-overline d-inline">
		Watch Now:
	</div>
	<div class="genre-set align-center d-inline">
		<template v-for="item in infos">
			<v-btn @click="click(item.link)" rounded="pill" variant="tonal" class="px-4" :size="buttonSize">
				{{ item.provider.name }}
			</v-btn>
		</template>
	</div>
</template>

<script setup lang="ts">
import type StreamingInfo from '@/models/streamingInfo'

const props = defineProps({
	infos: {
		type: Array<StreamingInfo>,
		required: true
	},
	buttonSize: {
		type: String,
		default: 'default'
	}
})

const click = (url: string) => {
	window.open(url, '_blank')
}

</script>

<style scoped lang="scss">

</style>
