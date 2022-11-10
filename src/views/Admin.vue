<template>
	<PageLayout>
		<div class="app-title">
			<h1>Admin Stuff</h1>
		</div>
		<div>
			You can only see this if you're an admin, maybe
		</div>
	</PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/navigation/PageLayout.vue'

export default {
	name: "Admin",
	components: { PageLayout },
}
</script>