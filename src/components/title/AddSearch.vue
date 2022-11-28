<template>
	<v-row justify="center">
		<v-dialog v-model="value" scrollable class="modal-contents" :class="dialogClasses" :width="width"
			:height="height">
			<v-card class="item-details">
				<v-card-title class="text-h4 mt-7 mx-6">{{ title }}</v-card-title>
				<v-card-text>
					<v-container>
						<v-row class="details--body">
							<v-col cols="12" sm="6" v-if="showPoster" class="pa-3">

								<!-- <div class="poster rounded" @click="showPosterDetail">
									<img :src="posterPath" />
								</div> -->

								<v-img :src="posterPath" class="d-flex rounded-lg" contain @click="showPosterDetail"
									:max-height="posterHeight">
									<template v-slot:placeholder>
										<v-row class="fill-height ma-0" align="center" justify="center">
											<v-progress-circular indeterminate color="grey lighten-5">
											</v-progress-circular>
										</v-row>
									</template>
								</v-img>
							</v-col>

							<v-col cols="12" sm="6" class="align-self-center pa-3">
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

										<v-btn @click="toggleQueued()" rounded="pill" variant="tonal" class="pill-btn">
											<template v-slot:default>
												<v-icon v-if="queued" class="queued">mdi-fire</v-icon>
												<span v-else>add to UpNext</span>
											</template>
										</v-btn>

										<v-spacer></v-spacer>

										<v-btn @click="toggleWatched()" rounded="pill" variant="tonal" class="pill-btn">
											<template v-slot:default>
												<v-icon v-if="watched" class="complete">mdi-check-bold</v-icon>
												<span v-else>mark watched</span>
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
				<v-card-actions :class="dialogActionClasses">

					<v-spacer></v-spacer>

					<v-btn @click="closeDialog" :size="buttonSize" :disabled="isLoading">Cancel</v-btn>

					<v-btn @click.prevent="save()" :size="buttonSize" color="secondary" type="submit" variant="flat"
						:disabled="isLoading" :loading="isLoading">Save</v-btn>

				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- <SimpleAlert v-model="alert" :titleText="alertTitle" :messageText="alertMessage"
			@confirm-alert="closeAlertWithConfirm()" @cancel-alert="closeAlert()" /> -->
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
import { formatYear } from '@/helpers/format'
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

const value = computed({
	get() {
		return props.modelValue
	},
	set(val: Boolean) {
		emit('update:modelValue', val)
	}
})

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

const selectedSearch = computed(() => {
	return collection.selectedSearch
})

const title = computed(() => {
	return selectedSearch.value.title
})

const mediaType = computed(() => {
	return selectedSearch.value.mediaType == MediaType.Movie ? 'Movie' : selectedSearch.value.mediaType == MediaType.TV ? 'Television Show' : ''
})

const genres = computed(() => {
	return selectedSearch.value.genres
})

const summary = computed(() => {
	return selectedSearch.value.summary
})

const releaseYear = computed(() => {
	return formatYear(selectedSearch.value.releaseDate)
})

const popularRating = computed(() => {
	return 'IMDB Rating ' + String(selectedSearch.value.popularRating?.toFixed(2))
})

// // ALERT MODAL
// const alert = ref(false)
// const alertTitle = `Confirm Cancel`
// const alertMessage = `Are you sure you want to discard your changes?`

// POSTER MODAL
const poster = ref(false)

const showPoster = computed(() => {
	return selectedSearch.value.poster != null && selectedSearch.value.poster != ''
})

const posterPath = computed(() => {
	return `${import.meta.env.VITE_POSTER_BASE_PATH}${selectedSearch.value.poster}`
})

const showPosterDetail = (): void => {
	poster.value = true
}

const posterHeight = computed(() => {
	return isVerySmallScreen.value ? '' : '40vh'
})

// DIALOG MANAGEMENT
const isSmallScreen = computed(() => {
	return ['xs', 'sm'].includes(name.value)
})

const isVerySmallScreen = computed(() => {
	return name.value == 'xs'
})

const width = computed(() => {
	return isSmallScreen.value ? '98%' : '60vw'
})

const height = computed(() => {
	return isSmallScreen.value ? '95vh' : '70vh'
})

const dialogClasses = computed(() => {
	return isSmallScreen.value ? 'pa-0 ma-0' : 'pa-10'
})

const dialogActionClasses = computed(() => {
	return isVerySmallScreen.value ? 'px-2 py-5' : 'pa-5'
})

const buttonSize = computed(() => {
	return isVerySmallScreen.value ? 'small' : 'default'
})

const closeDialog = () => {
	emit('update:modelValue', false)
}

const save = async () => {

	const userData = {
		queued: queued.value,
		favorite: favorite.value,
		watched: watched.value,
		rating: rating.value,
	} as UserTitleData

	await collection.addUserItem(userData)
	closeDialog()
}

const reset = () => {
	queued.value = false
	favorite.value = false
	watched.value = false
	rating.value = 0
}

watch(() => props.modelValue, (newValue) => {
	if (newValue) {
		reset()
	} else {
		collection.clearSearchData()
	}
})

</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/main';
@import '@/assets/modal';
</style>
