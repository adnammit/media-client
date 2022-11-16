<template>
	<PageLayout>

		<div class="text-center my-8">
			<div class="text-h1">
				<v-icon icon="mdi-chevron-triple-left" size="small"></v-icon>
				UpNext
			</div>
			<div class="text-h5">Delivering sanity in a world of too many f&#38;#%ing choices</div>
		</div>

		<v-container class="mt-8">
			<v-row justify="center">
				<HomeItem title="What is UpNext?"
					text="UpNext allows you to track your watch list across multiple streaming platforms. Search for movies and shows and see what platforms they're available on.">
					<!-- <v-btn class="ma-2 text-color--contrast" color="info" icon="mdi-arrow-right-circle"
							size="x-large" @click="handleSignup">
						</v-btn> -->
				</HomeItem>
				<HomeItem title="What is UpNext not?"
					text="UpNext can't tell you what streaming platforms you're subscribed to. Sorry, you still have to manage those yourself :) ">
					<!-- <v-btn class="ma-2 text-color--contrast" color="warning" icon="mdi-newspaper-variant-multiple"
							size="x-large" to="/feed">
						</v-btn> -->
				</HomeItem>
				<HomeItem title="Why is UpNext?" text="Because it's silly fun! Find more silliness over on GitHub">
					<v-btn absolute bottom left class="ma-2 text-color--contrast" color="secondary" icon="mdi-github"
						size="x-large" href="https://github.com/adnammit">
					</v-btn>
				</HomeItem>
			</v-row>
		</v-container>
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