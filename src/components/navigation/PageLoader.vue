<template>
	<PageLayout>
		<div class="loader">
			<v-progress-circular indeterminate :size="200"></v-progress-circular>
		</div>
	</PageLayout>
</template>

<script setup lang="ts">
import PageLayout from "@/components/navigation/PageLayout.vue"
</script>
