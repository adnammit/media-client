<template>
	<v-app id="inspire">
		<div v-if="isLoading" class="page-layout">
			<PageLoader />
		</div>
		<!-- ADD ERROR STATE -->
		<router-view v-else />
	</v-app>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeMount } from 'vue'
import { useMainStore } from '@/store'
import PageLoader from '@/components/navigation/PageLoader.vue'

const store = useMainStore()
const isLoading = store.isAuthenticated

onBeforeMount(() => {
	store.loadFeed()
})

// onMounted(() => {
// 	watch(auth, async (authState) => {
// 		store.syncUser({ ...authState.user }, authState.isAuthenticated)
// 	})
// })

</script>
