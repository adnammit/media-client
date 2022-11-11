<template>
	<PageLayout>
			<v-card variant="tonal" class="pa-6" max-width="400">
				<div>
					<v-card-title>
						Settings
					</v-card-title>
					<v-card-text>
						<div class="text--primary">
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

<script lang="ts">
import PageLayout from '@/components/navigation/PageLayout.vue'

export default {
	name: "Settings",
	components: { PageLayout },
}
</script>