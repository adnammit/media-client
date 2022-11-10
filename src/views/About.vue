<template>
	<PageLayout>
		<div class="text-center pa-5">
			<div class="text-h2">About UpNext</div>
			<div class="text-h5 pa-5">UpNext is a multi-tiered application made by a full-stack dev named Amanda 👋
			</div>

			<div>

				<v-card class="mx-auto my-3 pa-3" max-width="344" variant="tonal">
					<v-card-item>
						<div>
							<div class="text-h6 text-uppercase mb-1">
								<v-icon icon="mdi-vuejs" size="small"/>
								Client
							</div>
							<div class="text-caption">
								A Single-Page-Application that sits on top of Media Service and Media Database. Uses
								Vue3, Vite, Pinia, Vuetify 3, Typescript and Auth0
							</div>
						</div>
					</v-card-item>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn prepend-icon="mdi-github" href="https://github.com/adnammit/media-client" target="_blank">
							Source
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-card class="mx-auto my-3 pa-3" max-width="344" variant="tonal">
					<v-card-item>
						<div>
							<div class="text-h6 text-uppercase mb-1">
								<v-icon icon="mdi-nodejs" size="small"/>
								Service
							</div>
							<div class="text-caption">
								RESTful API to support the Movie App with Express, Concurrently + Nodemon and
								PostgreSQL integration
							</div>
						</div>
					</v-card-item>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn prepend-icon="mdi-github" href="https://github.com/adnammit/media-service" target="_blank">
							Source
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-card class="mx-auto my-3 pa-3" max-width="344" variant="tonal">
					<v-card-item>
						<div>
							<div class="text-h6 text-uppercase mb-1">
								<v-icon icon="mdi-database-outline" size="small"/>
								Database
							</div>
							<div class="text-caption">
								A PostgreSQL database to persist all our choices and lists. Project contains the
								relations and seeds for the database
							</div>
						</div>
					</v-card-item>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn prepend-icon="mdi-github" href="https://github.com/adnammit/media-database" target="_blank">
							Source
						</v-btn>
					</v-card-actions>
				</v-card>

			</div>
		</div>
	</PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/navigation/PageLayout.vue'

export default {
	name: "About",
	components: { PageLayout },
}
</script>