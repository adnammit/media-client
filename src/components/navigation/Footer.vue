<template>
	<v-footer class="grey-darken-1">
		<a href="https://github.com/adnammit" target="_blank" class="footer--link">
			<v-icon icon="mdi-github" class="mx-2"></v-icon>
			<span>Made by <strong>@adnammit</strong></span>
		</a>
		<v-spacer></v-spacer>
		<v-btn flat to="/about">About</v-btn>
		<v-btn flat icon="mdi-home" href="https://amandaryman.com" target="_blank"></v-btn>
	</v-footer>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.v-footer {
	max-height: 70px;
}
</style>
