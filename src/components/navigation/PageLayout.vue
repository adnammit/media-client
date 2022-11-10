<template>
	<NavBar />
	<v-main class="main-body">
		<v-container fluid>
			<v-row justify="center">
				<v-col cols="12">
					<!-- <v-sheet min-height="70vh" rounded="lg" class="pa-6"> -->
						<slot></slot>
					<!-- </v-sheet> -->
				</v-col>
			</v-row>
		</v-container>
	</v-main>
	<Footer />
</template>

<script setup lang="ts">
import NavBar from'@/components/navigation/NavBar.vue'
// import MobileNavBar from "@/components/mobile-nav-bar.vue"
import Footer from '@/components/navigation/Footer.vue'
</script>
