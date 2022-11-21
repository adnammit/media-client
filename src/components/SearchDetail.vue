<template>
	<v-row justify="center">

		<!-- <v-dialog v-model="modelValue" persistent>
			<v-card>
				<v-card-title class="text-h5">
					Use Google's location service?
				</v-card-title>
				<v-card-text>Let Google help apps determine location. This means sending anonymous location data to
					Google,
					even when no apps are running.</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green-darken-1" variant="text" @click="confirmDiscard">
						Disagree
					</v-btn>
					<v-btn color="green-darken-1" variant="text" @click.prevent="save">
						Agree
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog> -->


		<v-dialog v-model="modelValue" persistent scrollable max-width="40vw">
			<v-card class="item-details">
				<v-card-title>{{ title }}</v-card-title>
				<v-card-subtitle>{{ subtitle }}</v-card-subtitle>
				<v-divider></v-divider>
				<!-- <v-card-text>
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
									<v-col align-self="center"> {{ releaseYear }} • {{ popularRating }} </v-col>
								</v-row>
								<v-row>
									<v-col align-self="center">
										<GenreSet v-bind:genres="filter.selectedItem.genres" />
									</v-col>
								</v-row>
								<v-row>
									<v-col align-self="center">
										{{ filter.selectedItem.summary }}
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text> -->
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="confirmDiscard">Cancel</v-btn>
					<v-btn @click.prevent="save()" class="primary">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- TODO simple alert won't alert :( -->
		<SimpleAlert v-model="alert" :titleText="alertTitle" :messageText="alertMessage" @confirm-alert="closeAlertWithConfirm()" @cancel-alert="closeAlert()" />
		<!-- <Poster v-model="poster" :path="posterPath" /> -->
	</v-row>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import type UserTitleData from '@/dto/userTitleData'
import type Genre from '@/models/genre'
import { MediaType } from '@/models/enum'
import { formatYear } from '@/filters/format'
import Title from '@/models/title'
import type SearchResult from '@/models/searchResult'
import Rating from '@/components/title/Rating.vue'
import GenreSet from '@/components/title/GenreSet.vue'
import SimpleAlert from '@/components/SimpleAlert.vue'
import Poster from '@/components/title/Poster.vue'


const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
})

const emit = defineEmits(['update:modelValue'])

const store = useMainStore()
const filter = useFilterStore()

// USER INPUT - TODO combine as reactive obj if they're not treated separately
const queued = ref(false)
const favorite = ref(false)
const watched = ref(false)
const rating = ref(0)

const toggleQueued = () => {
	queued.value = !queued.value
}
const toggleFavorite = () => {
	favorite.value = !favorite.value
}
const toggleWatched = () => {
	watched.value = !watched.value
}
const setRating = (val: number) => { // emitted from Rating child
	rating.value = val
}
const reset = () => {
	queued.value = false
	favorite.value = false
	watched.value = false
	rating.value = 0
}

// SEARCH RESULT: data from the searchResult
const title = computed(() => {
	return filter.selectedItem.title
})

const subtitle = computed(() => {
	return filter.selectedItem.mediaType == MediaType.Movie ? 'Movie' : filter.selectedItem.mediaType == MediaType.TV ? 'Television Show' : ''
})

// const releaseYear = computed(() => {
// 	return formatYear(filter.selectedItem.releaseDate)
// })

const popularRating = computed(() => {
	'IMDB Rating ' + String(filter.selectedItem.popularRating)
})

// ALERT MODAL
const alert = ref(false)
const alertTitle = `Confirm Cancel`
const alertMessage = `Are you sure you want to discard changes to ${title.value}?`

// // remove if not needed
// const description = computed(() => {
// 	return filter.selectedItem.summary ?? ''

// })


// POSTER MODAL
const poster = ref(false)
const posterPath = `${import.meta.env.VITE_POSTER_BASE_PATH}${filter.selectedItem.poster}`
const showPoster = filter.selectedItem.poster != null && filter.selectedItem.poster != ''

const showPosterDetail = (): void => {
	poster.value = true
}

// DIALOG MANAGEMENT
const confirmDiscard = () => {
	alert.value = true
}

const closeAlert = () => {
	alert.value = false
}

const closeAlertWithConfirm = () => {
	alert.value = false
	filter.clearSearchData()
	emit('update:modelValue')
}

const save = async () => {

	const userData = {
		queued: queued.value,
		favorite: favorite.value,
		watched: watched.value,
		rating: rating.value,
	} as UserTitleData

	await store.addUserItem(userData)
	emit('update:modelValue')
}


// // reset values when the model closes -- actually this seems unnecessary...?
// watch(() => props.modelValue, (newValue) => {
// 	if (!newValue) {
// 		reset()
// 	}
// })


</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/main';

// .item-details::v-deep {
// 	.v-card__subtitle {
// 		letter-spacing: 1px;
// 	}

// 	.v-card__text {
// 		height: 60vh;
// 		padding: 10px 30px;

// 		.row.details--body {
// 			padding: 10px 30px;
// 		}
// 	}

// 	.poster {
// 		max-height: 40vh;
// 		display: flex;
// 	}
// }
</style>
