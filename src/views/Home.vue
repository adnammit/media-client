<template>
	<PageLayout>

		<div class="app-title">
			<h1>UpNext</h1>
			<p class="lead">Delivering sanity in a world of too many f&#38;#%ing choices</p>
		</div>

		<HomeItem title="Get Started" text="Create an account for a personalized experience">
			<v-btn class="ma-2 color--bold" color="info" icon="mdi-arrow-right-circle" size="x-large"
				@click="handleSignup">
			</v-btn>
		</HomeItem>
		<HomeItem title="Stay Connected" text="Check out The Feed to stay up to date on all things cowpoke-related!">
			<v-btn class="ma-2 color--bold" color="warning" icon="mdi-newspaper-variant-multiple" size="x-large"
				to="/collection">
			</v-btn>
		</HomeItem>
		<HomeItem title="Why Cowpoke Lounge?" text="Because it's silly fun! Find more silliness over on GitHub">
			<v-btn class="ma-2 color--bold" color="secondary" icon="mdi-github" size="x-large"
				href="https://github.com/adnammit">
			</v-btn>
		</HomeItem>
	</PageLayout>
</template>

<script lang="ts">
import HomeItem from '@/components/HomeItem.vue'
import PageLayout from '@/components/navigation/PageLayout.vue'
import { useAuth0 } from '@auth0/auth0-vue'

export default {
	name: "Home",
	components: { HomeItem, PageLayout },
	setup() {
		const { loginWithRedirect } = useAuth0()

		const handleSignup = () => {
			loginWithRedirect({
				prompt: "login",
				appState: {
					target: "/profile",
				},
				screen_hint: "signup",
			});
		};

		return { handleSignup }
	}
}
</script>