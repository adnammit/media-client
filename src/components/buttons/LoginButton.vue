<template>
	<v-btn prepend-icon="mdi-login-variant" @click="handleLogin" variant="outlined" :class="classes">Login</v-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
	classes: String
})

const router = useRouter()
function handleLogin () {
	router.push({ path: '/login' })
}
</script>


