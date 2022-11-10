<template>
	<v-card class="ma-6">
		<v-card-title>
			{{ title }}
		</v-card-title>

		<v-card-text>
			<v-row align="center" class="px-2" hide-gutters no-gutters>
				<v-col cols="8">
					{{ text }}
				</v-col>
				<v-col align="right">
					<slot></slot>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
defineProps({
	title: String,
	text: String
})
</script>