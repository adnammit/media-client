<template>
	<v-col cols="12" sm="4" lg="3" align="center">
		<v-card height="400px" class="pa-2">
			<v-card-title class="text-h5 text-spaced my-5">
				{{ title }}
			</v-card-title>
			<v-card-text class="text-body-2">
				<template v-for="line in text">
					<div class="py-2">
					{{ line }}
					</div>
				</template>
			</v-card-text>
			<div class="position--bottom-center">
				<slot></slot>
			</div>
		</v-card>
	</v-col>
</template>

<script setup lang="ts">

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	text: {
		type: Array,
		default: ''
	}
})

const show = false

</script>

<style scoped lang="scss">
.position--bottom-center {
	position: absolute;
	bottom: 8px;
	margin: 0 auto;
	left: 50%;
	margin-left: -32px;
}
</style>