<template>
	<v-row justify="center">
		<v-dialog v-model="modelValue" persistent scrollable class="modal-contents" :class="classes" :width="width" :height="height">
			<v-card class="item-details">
				<v-card-title class="text-h4 mt-7">{{ title }}</v-card-title>
				<v-card-text>
					<v-container>
						<v-row class="details--body">
							<v-col cols="12" sm="6" v-if="showPoster">

								<!-- <div class="poster rounded" @click="showPosterDetail">
									<img :src="posterPath" />
								</div> -->


								<v-img :src="posterPath" class="poster" contain @click="showPosterDetail">
									<template v-slot:placeholder>
										<v-row class="fill-height ma-0" align="center" justify="center">
											<v-progress-circular indeterminate color="grey lighten-5">
											</v-progress-circular>
										</v-row>
									</template>
								</v-img>
							</v-col>
							<v-col cols="12" sm="6" class="align-self-center">
								<v-row>
									<v-col align-self="center"> {{ releaseYear }} • {{ popularRating }} </v-col>
								</v-row>
								<v-row>
									<v-col align-self="center">
										{{ mediaType }}
									</v-col>
								</v-row>
								<v-row>
									<v-col align-self="center">
										<GenreSet v-bind:genres="filter.selectedItem.genres" />
									</v-col>
								</v-row>

								<v-row justify="space-between">
									<v-col>
										<v-btn @click="toggleWatched()" rounded="pill" variant="tonal" class="pill-btn">
											<template v-slot:default>
												<v-icon v-if="watched" class="complete">mdi-check-bold</v-icon>
												<span v-else>mark watched</span>
											</template>
										</v-btn>
										<v-spacer></v-spacer>

										<v-btn @click="toggleQueued()" rounded="pill" variant="tonal" class="pill-btn">
											<template v-slot:default>
												<v-icon v-if="queued" class="queued">mdi-fire</v-icon>
												<span v-else>add to UpNext</span>
											</template>
										</v-btn>
										<v-spacer></v-spacer>

										<v-btn @click="toggleFavorite()" rounded="pill" variant="tonal"
											class="pill-btn">
											<template v-slot:default>
												<v-icon v-if="favorite" class="favorite">mdi-star-circle</v-icon>
												<span v-else>add favorite</span>
											</template>
										</v-btn>


									</v-col>
								</v-row>

								<!-- <v-row justify="space-between">
									<v-col>
										<div @click="toggleWatched()" class="d-inline">
											<v-icon v-if="watched" class="complete">mdi-check-bold</v-icon>
											<v-icon v-else class="icon--deselected">mdi-panorama-fisheye</v-icon>
										</div>
										<div @click="toggleQueued()" class="d-inline">
											<v-icon v-if="queued" class="queued">mdi-fire</v-icon>
											<v-icon v-else class="icon--deselected">mdi-fire</v-icon>
										</div>
										<div @click="toggleFavorite()" class="d-inline">
											<v-icon v-if="favorite" class="favorite">mdi-star-circle</v-icon>
											<v-icon v-else class="icon--deselected">mdi-star-circle-outline</v-icon>
										</div>
									</v-col>
								</v-row> -->

								<v-row>
									<v-col align-self="center">
										<Rating v-model="rating" />
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
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="confirmDiscard">Cancel</v-btn>
					<v-btn @click.prevent="save()" class="primary" color="secondary">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<SimpleAlert v-model="alert" :titleText="alertTitle" :messageText="alertMessage"
			@confirm-alert="closeAlertWithConfirm()" @cancel-alert="closeAlert()" />
		<!-- <Poster v-model="poster" :path="posterPath" /> -->
	</v-row>
</template>

<script setup lang="ts">
import { ref, computed, type Ref, onBeforeMount } from 'vue'
import { useDisplay } from 'vuetify'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import type UserTitleData from '@/dto/userTitleData'
import { MediaType } from '@/models/enum'
import { formatYear } from '@/filters/format'
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
const { name } = useDisplay()

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

const mediaType = computed(() => {
	return filter.selectedItem.mediaType == MediaType.Movie ? 'Movie' : filter.selectedItem.mediaType == MediaType.TV ? 'Television Show' : ''
})

const releaseYear = computed(() => {
	return formatYear(filter.selectedItem.releaseDate)
})

const popularRating = computed(() => {
	return 'IMDB Rating ' + String(filter.selectedItem.popularRating)
})

// ALERT MODAL
const alert = ref(false)
const alertTitle = `Confirm Cancel`
const alertMessage = `Are you sure you want to discard your changes?`

// POSTER MODAL
const poster = ref(false)

const showPoster = computed(() => {
	return filter.selectedItem.poster != null && filter.selectedItem.poster != ''
})

const posterPath = computed(() => {
	return `${import.meta.env.VITE_POSTER_BASE_PATH}${filter.selectedItem.poster}`
})

const showPosterDetail = (): void => {
	poster.value = true
}

// DIALOG MANAGEMENT
const smallScreens = ['xs', 'sm']

const width = computed(() => {
	return smallScreens.includes(name.value) ? '98%' : '60vw'
	// return name.value == 'xs' ? '90vw' : '60vw'
})

const height = computed(() => {
	return smallScreens.includes(name.value) ? '95vh' : '70vh'
})

const classes = computed(() => {
	return smallScreens.includes(name.value) ? 'pa-0 ma-0' : 'pa-10'
})

const closeDialog = () => {
	emit('update:modelValue')
	reset()
}

const confirmDiscard = () => {
	alert.value = true
}

const closeAlert = () => {
	alert.value = false
}

const closeAlertWithConfirm = () => {
	alert.value = false
	filter.clearSearchData()
	closeDialog()
}

const save = async () => {

	const userData = {
		queued: queued.value,
		favorite: favorite.value,
		watched: watched.value,
		rating: rating.value,
	} as UserTitleData

	await store.addUserItem(userData)
	closeDialog()
}

</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/main';
@import '@/assets/modal';

.item-details {
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
