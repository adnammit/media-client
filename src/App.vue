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
import { reactive, watch, onMounted, onBeforeMount } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useMainStore } from '@/store'
import PageLoader from '@/components/navigation/PageLoader.vue'

const { isLoading } = useAuth0()
const auth = reactive(useAuth0())
const store = useMainStore()

onBeforeMount(() => {
	store.loadFeed()
})

onMounted(() => {
	watch(auth, async (authState) => {
		store.syncUser({ ...authState.user }, authState.isAuthenticated)
	})
})

</script>
