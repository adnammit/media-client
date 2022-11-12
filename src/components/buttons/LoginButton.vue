<template>
	<v-btn prepend-icon="mdi-login-variant" @click="handleLogin" variant="outlined" class="mx-3 px-3">Login</v-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function handleLogin () {
	router.push({ path: '/login' })
}
</script>


