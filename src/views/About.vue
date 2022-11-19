<template>
	<PageLayout>
		<div class="text-center py-7">
			<div class="">
				<div class="text-h2 pa-5">About UpNext</div>
				<div class="text-h5 pa-5">
					UpNext is a multi-tiered application made by a full-stack dev named Amanda 👋
				</div>
				<div class="text-subtitle-1">
					UpNext has primarily been a way for me to practice and learn. If you try it and like it, let me
					know!

				</div>
			</div>
			<div>
				<template v-for="(item, index) in items" :key="item.id">
					<AboutItem :title="item.title" :text="item.text" :icon="item.icon" :href="item.href" />
				</template>
			</div>
			<div class="text-subtitle-1">
				UpNext is made possible by <a href="https://www.themoviedb.org/" target="_blank">The Movie Database
					API</a>
			</div>
		</div>
	</PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/components/navigation/PageLayout.vue'
import AboutItem from '@/components/AboutItem.vue'

const items = [
	{
		title: 'Client',
		text: 'Single-Page Client Application that sits on top of the service. Uses Vue3, Vite, Pinia, Vuetify 3, Typescript and Auth',
		icon: 'mdi-vuejs',
		href: 'https://github.com/adnammit/media-client'
	},
	{
		title: 'Service',
		text: 'RESTful API to support the client. Implemented with Node/Express, Concurrently + Nodemon and PostgreSQL integration',
		icon: 'mdi-nodejs',
		href: 'https://github.com/adnammit/media-service'
	},
	{
		title: 'Database',
		text: 'PostgreSQL database to persist all our choices and lists. Repo contains the relations and seeds needed to set up the database',
		icon: 'mdi-database-outline',
		href: 'https://github.com/adnammit/media-database'
	},
]

</script>