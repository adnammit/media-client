<template>
	<v-row justify="center">
		<v-dialog v-model="showDialog" scrollable max-width="40vw">
			<v-card class="item-details">
				<v-card-title>{{ title }}</v-card-title>
				<v-card-subtitle>{{ subtitle }}</v-card-subtitle>
				<v-divider></v-divider>
				<v-card-text>
					<v-container>
						<v-row justify="center" align="center">
							<v-spacer></v-spacer>
							<v-col cols="auto">
								<div @click="toggleWatched()">
									<v-icon v-if="watched" class="complete">mdi-check-bold</v-icon>
									<v-icon v-else class="icon--deselected">mdi-panorama-fisheye</v-icon>
								</div>
							</v-col>
							<v-spacer></v-spacer>
							<v-col cols="auto">
								<Rating v-model="rating" />
							</v-col>
							<v-spacer></v-spacer>
							<v-col cols="auto">
								<div @click="toggleQueued()">
									<v-icon v-if="queued" class="queued">mdi-fire</v-icon>
									<v-icon v-else class="icon--deselected">mdi-fire</v-icon>
								</div>
							</v-col>
							<v-spacer></v-spacer>
							<v-col cols="auto">
								<div @click="toggleFavorite()">
									<v-icon v-if="favorite" class="favorite">mdi-star-circle</v-icon>
									<v-icon v-else class="icon--deselected">mdi-star-circle-outline</v-icon>
								</div>
							</v-col>
							<v-spacer></v-spacer>
						</v-row>
						<v-row class="details--body">
							<v-col cols="6" v-if="showPoster">
								<v-img :src="posterPath" class="poster" contain @click="showPosterDetail">
									<template v-slot:placeholder>
										<v-row class="fill-height ma-0" align="center" justify="center">
											<v-progress-circular indeterminate color="grey lighten-5">
											</v-progress-circular>
										</v-row>
									</template>
								</v-img>
							</v-col>
							<v-col cols="6" class="align-self-center">
								<v-row>
									<v-col align-self="center"> {{ year }} • {{ popularRating }} </v-col>
								</v-row>
								<v-row>
									<v-col align-self="center">
										<GenreSet v-bind:genres="genres" />
									</v-col>
								</v-row>
								<v-row>
									<v-col align-self="center">
										{{ description }}
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click.stop="confirmRemove" class="remove">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
					<v-btn @click.stop="confirmDiscard">Cancel</v-btn>
					<v-btn @click.stop="save" class="save">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<!-- TODO NEED ALERT FOR DISCARD AND REMOVE, OR SIMPLIFY  -->
		<SimpleAlert v-model="alert" :titleText="alertTitle" :messageText="alertMessage" :onConfirm="closeDialog" />
		<Poster v-model="poster" :path="posterPath" />
	</v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import type SearchResult from '@/models/searchResult'
import Rating from '@/components/title/Rating.vue'
import GenreSet from '@/components/title/GenreSet.vue'
import SimpleAlert from '@/components/SimpleAlert.vue'
import Poster from '@/components/title/Poster.vue'
import type Genre from '@/models/genre'
import { MediaType } from '@/models/enum'

export default defineComponent({
	components: { Rating, GenreSet, SimpleAlert, Poster },
	props: {
		value: Boolean,
		// onSave!: Function,
	},
	data() {
		return {
			queued: false,
			favorite: false,
			watched: false,
			rating: 0,
			alert: false,
			alertTitle: 'Confirm Removal',
			poster: false,
		}
	},
	computed: {
		alertMessage(): string {
			return 'Are you sure you want to discard changes to "' + this.selectedItem.title + '"?'
		},
		selectedItem(): SearchResult {
			if (!!this.filterStore.selectedItem) return this.filterStore.selectedItem
			const msg = 'Could not load selected item'
			console.error(msg)
			throw Error()
		},
		title(): string {
			return this.selectedItem.title
		},

		subtitle(): string {
			return this.selectedItem.mediaType == MediaType.Movie ? 'Movie' : this.selectedItem.mediaType == MediaType.TV ? 'Television Show' : ''
		},

		year(): string {
			return this.selectedItem.releaseYear
		},

		popularRating(): string {
			return 'IMDB Rating ' + String(this.selectedItem.popularRating)
		},

		genres(): Genre[] {
			return this.selectedItem.genres
		},

		description(): string {
			return this.selectedItem.summary ?? ''
		},

		showPoster(): boolean {
			return this.selectedItem.poster != null && this.selectedItem.poster != ''
		},

		posterPath(): string {
			return `${import.meta.env.VITE_POSTER_BASE_PATH}${this.selectedItem.poster}`
		},

		showDialog(): boolean {
			return this.value
		},

		// set showDialog(value: boolean) {
		// 	this.$emit('input', value)
		// }
	},
	methods: {

		toggleQueued(): void {
			this.queued = !this.queued
		},

		toggleFavorite(): void {
			this.favorite = !this.favorite
		},

		toggleWatched(): void {
			this.watched = !this.watched
		},

		showPosterDetail(): void {
			this.poster = true
		},

		reset() {
			this.queued = false
			this.favorite = false
			this.watched = false
			this.rating = 0
		},

		closeDialog() {
			this.showDialog = false
		},

		async save() {
			const item = Object.assign(this.selectedItem) // not deep copy
			item.queued = this.queued
			item.favorite = this.favorite
			item.watched = this.watched
			item.rating = this.rating
			await this.mainStore.addUserItem(item)
			this.closeDialog()
		},

		confirmDiscard() {
			this.alert = true
		},

		confirmRemove() {
			this.alert = true
		},
		// remove() {
		// 	AppModule.removeFromCollection(AppModule.selectedItem)
		// 	this.closeDialog()
		// },
	},
	watch: {
		value(val) {
			if (this.value) this.reset()
		}
	},
	setup() {
		const mainStore = useMainStore()
		const filterStore = useFilterStore()
		return { mainStore, filterStore }
	}
})
</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/main';

.item-details::v-deep {
	.v-card__subtitle {
		letter-spacing: 1px;
	}

	.v-card__text {
		height: 60vh;
		padding: 10px 30px;

		.row.details--body {
			padding: 10px 30px;
		}
	}

	.poster {
		max-height: 40vh;
		display: flex;
	}
}
</style>
