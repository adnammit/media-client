<template>
	<NavBar />
	<v-main class="main-body">
		<v-container fluid class="fill-height">
			<v-row justify="center">
				<v-col cols="12" class="text-xs-center">
					<div class="d-flex align-center flex-column">
						<slot></slot>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
	<Footer />
</template>

<script setup lang="ts">
import NavBar from '@/components/navigation/NavBar.vue'
import Footer from '@/components/navigation/Footer.vue'
</script>
