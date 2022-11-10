<template>
	<v-btn prepend-icon="mdi-login-variant" @click="handleLogin" variant="outlined">Login</v-btn>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect } = useAuth0();

const handleLogin = () => {
	loginWithRedirect({
		prompt: 'login',
		appState: {
			target: '/collection',
		},
	})
}
</script>


