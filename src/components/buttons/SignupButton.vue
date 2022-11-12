<template>
	<v-btn @click="handleSignup" variant="text" class="mx-3 px-3">Sign Up</v-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function handleSignup() {
	// TODO: signin page or send props to login page to indicate signup status
	router.push({ path: '/login' })
}
</script>


