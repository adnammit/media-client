<template>
	<v-app id="inspire">
		<template v-if="isLoading">
			<PageLoader />
		</template>
		<!-- ADD ERROR STATE -->
		<router-view v-else />
	</v-app>
</template>

<script setup lang="ts">
// import { watch, onMounted, onBeforeMount } from 'vue'
import { useMainStore } from '@/store'
import PageLoader from '@/components/navigation/PageLoader.vue'

const store = useMainStore()
const isLoading = store.isLoading

// onMounted(() => {
// 	watch(auth, async (authState) => {
// 		store.syncUser({ ...authState.user }, authState.isAuthenticated)
// 	})
// })

</script>
