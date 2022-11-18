<template>
	<v-app id="inspire">
		<!-- <template v-if="isLoading">
			<PageLoader />
		</template> -->
		<!-- ADD ERROR STATE -->
		<router-view />
	</v-app>
</template>

<script setup lang="ts">
// import { watch, onMounted, onBeforeMount } from 'vue'
import { useMainStore } from '@/store'
// import { useTheme } from 'vuetify'
// import PageLoader from '@/components/navigation/PageLoader.vue'

const store = useMainStore()
// const theme = useTheme()
// const isLoading = store.isLoading

// onBeforeMount(() => {
// 	const isDarkMode = window.matchMedia &&
// 		window.matchMedia("(prefers-color-scheme: dark)").matches
// 	// Testing
// 	console.log(isDarkMode);
// 	if (isDarkMode) {
// 		theme.global.name.value = 'dark'
// 	}
// })

</script>
