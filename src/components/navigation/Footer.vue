<template>
	<v-footer class="grey-darken-1">
		<strong>Made by <a href="https://github.com/adnammit">@adnammit</a></strong>
		<v-spacer></v-spacer>
		<v-btn flat icon="mdi-github" href="https://github.com/adnammit/vue3boilerplate-auth0"></v-btn>
		<v-btn flat icon="mdi-home" href="https://amandaryman.com"></v-btn>
	</v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Footer'
})
</script>

<style scoped lang="scss">
.v-footer {
	max-height: 70px;
}
</style>
