<template>
	<v-app-bar flat>

		<v-btn to="/" class="ml-5" variant="text">UpNext</v-btn>

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
