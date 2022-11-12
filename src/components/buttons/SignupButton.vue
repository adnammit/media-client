<template>
	<v-btn @click="handleSignup" variant="text" :class="classes" class="d-inline-block">Sign Up</v-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
	classes: String
})

const router = useRouter()
function handleSignup() {
	// TODO: signin page or send props to login page to indicate signup status
	router.push({ path: '/signup' })
}
</script>


