<template>
	<v-app-bar flat>

		<!-- make this the site logo and link to home -->
		<!-- <v-avatar class="mr-10 ml-4" size="52" to="/">
				<v-img v-if="isLoggedIn" alt="Avatar" src="src/assets/profile.jpg"></v-img>
				<v-icon v-else icon="mdi-account-circle"></v-icon>
			</v-avatar> -->

		<v-btn prepend-icon="mdi-home" to="/" class="ml-5">Home</v-btn>

		<v-spacer></v-spacer>

		<UserMenu />

		<v-btn icon="mdi-brightness-6" @click="toggleTheme"></v-btn>

	</v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify'
import UserMenu from '@/components/navigation/UserMenu.vue'

export default defineComponent({
	name: 'NavBar',
	components: {
		UserMenu
	},
	setup() {
		const theme = useTheme()
		return {
			toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark',
		}
	}
})
</script>
