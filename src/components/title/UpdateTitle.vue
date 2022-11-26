<template>
	<v-row justify="center">
		<v-dialog v-model="modelValue" scrollable class="modal-contents" :class="classes" :width="width"
			:height="height">
			<v-card class="item-details">

				<v-tooltip :text="`titleId ${userTitle.id}`" location="top" open-delay="500">
					<template v-slot:activator="{ props }">
						<v-card-title v-bind="props" class="text-h4 mt-7 mx-6">{{ title }}</v-card-title>
					</template>
				</v-tooltip>

				<v-card-text>
					<v-container>
						<v-row class="details--body">
							<v-col cols="12" sm="6" v-if="showPoster" class="pa-0 ma-0">

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
										<GenreSet v-bind:genres="genres" />
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

								<v-row>
									<v-col align-self="center">
										<!-- TODO yellow stars -->
										<v-rating v-model="rating" hover clearable density="comfortable"></v-rating>
									</v-col>
								</v-row>

								<v-row>
									<v-col align-self="center">
										{{ summary }}
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions class="pa-5">
					<v-spacer></v-spacer>
					<v-btn @click="confirmDelete" color="error" variant="flat" :disabled="isLoading">Delete</v-btn>
					<v-btn @click="closeDialog" :disabled="isLoading">Cancel</v-btn>
					<v-btn @click.prevent="save()" color="secondary" type="submit" variant="flat" :disabled="isLoading" :loading="isLoading">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<SimpleAlert v-model="alert" :titleText="alertTitle" :messageText="alertMessage" :cancelText="cancelText"
			@confirm-alert="closeAlertWithConfirm()" @cancel-alert="closeAlert()" />
		<!-- <Poster v-model="poster" :path="posterPath" /> -->
	</v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useMainStore } from '@/store/'
import { useCollectionStore } from '@/store/collection'
import type UserTitleData from '@/dto/userTitleData'
import { MediaType } from '@/models/enum'
import { formatYear } from '@/filters/format'
import GenreSet from '@/components/title/GenreSet.vue'
import SimpleAlert from '@/components/SimpleAlert.vue'
import Poster from '@/components/title/Poster.vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
})

const emit = defineEmits(['update:modelValue', 'closeDialog'])

const store = useMainStore()
const collection = useCollectionStore()
const { name } = useDisplay()

// USER INPUT - TODO combine as reactive obj if they're not treated separately
const queued = ref(false)
const favorite = ref(false)
const watched = ref(false)
const rating = ref(0)

const isLoading = computed(() => {
	return store.isLoading
})

const toggleQueued = () => {
	queued.value = !queued.value
}

const toggleFavorite = () => {
	favorite.value = !favorite.value
}

const toggleWatched = () => {
	watched.value = !watched.value
}

const userTitle = computed(() => {
	return collection.selectedUserTitle
})

const title = computed(() => {
	return userTitle.value.title
})

const mediaType = computed(() => {
	return userTitle.value.mediaType == MediaType.Movie ? 'Movie' : userTitle.value.mediaType == MediaType.TV ? 'Television Show' : ''
})

const genres = computed(() => {
	return userTitle.value.genres
})

const summary = computed(() => {
	return userTitle.value.summary
})

const releaseYear = computed(() => {
	return formatYear(userTitle.value.releaseDate)
})

const popularRating = computed(() => {
	return 'IMDB Rating ' + String(userTitle.value.popularRating)
})

// ALERT MODAL
const alert = ref(false)
const alertTitle = `Confirm`
const alertMessage = `Are you sure you want to delete this?`
const cancelText = `Nevermind`

// POSTER MODAL
const poster = ref(false)

const showPoster = computed(() => {
	return userTitle.value.poster != null && userTitle.value.poster != ''
})

const posterPath = computed(() => {
	return `${import.meta.env.VITE_POSTER_BASE_PATH}${userTitle.value.poster}`
})

const showPosterDetail = (): void => {
	poster.value = true
}

// DIALOG MANAGEMENT
const smallScreens = ['xs', 'sm']

const width = computed(() => {
	return smallScreens.includes(name.value) ? '98%' : '60vw'
})

const height = computed(() => {
	return smallScreens.includes(name.value) ? '95vh' : '70vh'
})

const classes = computed(() => {
	return smallScreens.includes(name.value) ? 'pa-0 ma-0' : 'pa-10'
})

const closeDialog = () => {
	emit('closeDialog')
}

const confirmDelete = () => {
	alert.value = true
}

const closeAlert = () => {
	alert.value = false
}

const closeAlertWithConfirm = async () => {
	alert.value = false
	await collection.deleteUserItem(collection.selectedUserTitle.id)
	closeDialog()
}

// const confirmDiscard = () => {
// 	alert.value = true
// }

// const closeAlert = () => {
// 	alert.value = false
// }

// const closeAlertWithConfirm = () => {
// 	alert.value = false
// 	collection.clearUserTitleData()
// 	closeDialog()
// }

const save = async () => {

	const userData = {
		queued: queued.value,
		favorite: favorite.value,
		watched: watched.value,
		rating: rating.value,
	} as UserTitleData

	await collection.updateUserItem(userTitle.value.id, userData)
	closeDialog()
}

const reset = () => {
	queued.value = userTitle.value.queued
	favorite.value = userTitle.value.favorite
	watched.value = userTitle.value.watched
	rating.value = userTitle.value.rating
}

watch(() => props.modelValue, (newValue) => {
	if (!newValue) {
		emit('closeDialog')
	} else {
		reset()
	}
})

</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/main';
@import '@/assets/modal';
</style>
