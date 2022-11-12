<template>
	<PageLayout>

		<div class="text-center my-8">
			<div class="text-h1">
				<v-icon icon="mdi-chevron-triple-left" size="small"></v-icon>
				UpNext
			</div>
			<div class="text-h5">Delivering sanity in a world of too many f&#38;#%ing choices</div>
		</div>

		<!-- <HomeItem title="Get Started" text="Create an account for a personalized experience">
			<v-btn class="ma-2 color--bold" color="info" icon="mdi-arrow-right-circle" size="x-large"
				@click="handleSignup">
			</v-btn>
		</HomeItem>
		<HomeItem title="Stay Connected" text="Check out The Feed to stay up to date on all things cowpoke-related!">
			<v-btn class="ma-2 color--bold" color="warning" icon="mdi-newspaper-variant-multiple" size="x-large"
				to="/feed">
			</v-btn>
		</HomeItem>
		<HomeItem title="Why Cowpoke Lounge?" text="Because it's silly fun! Find more silliness over on GitHub">
			<v-btn class="ma-2 color--bold" color="secondary" icon="mdi-github" size="x-large"
				href="https://github.com/adnammit">
			</v-btn>
		</HomeItem> -->
	</PageLayout>
</template>

<script lang="ts">
import HomeItem from '@/components/HomeItem.vue'
import PageLayout from '@/components/navigation/PageLayout.vue'
// import { useRouter } from 'vue-router'

export default {
	name: "Home",
	components: { HomeItem, PageLayout },
	// setup() {

	// 	const router = useRouter()
	// 	function handleSignup() {
	// 		router.push({ path: '/login' })
	// 	}

	// 	return { handleSignup }
	// }
}
</script>