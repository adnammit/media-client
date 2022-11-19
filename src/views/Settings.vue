<template>
	<PageLayout>
		<v-card variant="tonal" class="my-5 pa-5" max-width="400">
			<div>
				<v-card-title class="text-h4">
					Settings
				</v-card-title>
				<v-card-text>
					<div class="text-body-1">
						Secret settings that only authenticated users can see
					</div>
				</v-card-text>
				<v-card-actions>
					<!-- <v-btn>Click me</v-btn> -->
				</v-card-actions>
			</div>
		</v-card>
	</PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/components/navigation/PageLayout.vue'
</script>