<template>
	<v-app-bar flat>

		<v-btn prepend-icon="mdi-chevron-triple-left" to="/" :class="buttonSpacingClasses" variant="text">UpNext</v-btn>

		<v-spacer></v-spacer>

		<UserMenu :classes="buttonSpacingClasses" />

		<v-btn icon="mdi-brightness-6" @click="toggleTheme" :class="buttonSpacingClasses"></v-btn>

	</v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useDisplay } from 'vuetify'
import UserMenu from '@/components/navigation/UserMenu.vue'

const theme = useTheme()
const { name } = useDisplay()

const buttonSpacingClasses = computed(() => {
	return name.value == 'xs' ? 'mx-0' : 'mx-3 px-3'
})

const toggleTheme = () => {
	theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>