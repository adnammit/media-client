<template>
	<NavBar />
	<v-main class="main-body">
		<v-container fluid>
			<v-row justify="center">
				<v-col cols="12" md="3" xl="2">
					<FeedBar />
				</v-col>
				<v-col cols="12" md="8" xl="6">
					<v-sheet min-height="70vh" rounded="lg" class="pa-6">
						<slot></slot>
					</v-sheet>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
	<Footer />
</template>

<script setup lang="ts">
import NavBar from "@/components/navigation/NavBar.vue";
import FeedBar from "@/components/navigation/FeedBar.vue";
// import MobileNavBar from "@/components/mobile-nav-bar.vue";
import Footer from "@/components/navigation/Footer.vue";
</script>
