<template>
	<v-btn @click="handleSignup" variant="text">Sign Up</v-btn>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

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
</script>


