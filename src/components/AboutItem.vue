<template>

	<v-card class="mx-auto my-7 pa-5" max-width="344" variant="tonal">
		<v-card-item>
			<div>
				<div class="text-h6 text-uppercase mb-1">
					<v-icon :icon="icon" size="small" />
					{{ title }}
				</div>
				<div class="text-caption">
					{{ text }}
				</div>
			</div>
		</v-card-item>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn prepend-icon="mdi-github" :href="href" target="_blank" variant="tonal" class="px-5">
				Source
			</v-btn>
		</v-card-actions>
	</v-card>

</template>

<script setup lang="ts">
defineProps({
	title: String,
	text: String,
	icon: String,
	href: String
})
</script>