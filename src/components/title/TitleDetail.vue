<template>
	<v-row justify="center">
		<v-dialog v-model="value" scrollable class="modal-contents" :class="dialogClasses"
			:fullscreen="isVerySmallScreen" :max-width="maxWidth">
			<v-card>
				<v-card-text class="pa-0">
					<v-container class="pa-3">

						<v-row>
							<v-img :src="posterPath" class="text-white" :cover="posterCover" :height="posterHeight">
								<template v-slot:placeholder>
									<!-- TODO default image for titles with no poster/put in collection view too -->
									<!-- <v-row class="fill-height ma-0" align="center" justify="center">
											<v-progress-circular indeterminate color="grey lighten-5">
											</v-progress-circular>
										</v-row> -->
								</template>

								<div class="h-100 w-100" :style="`background-color:${overlayBgColor}`">
									<!-- top content -->
									<v-toolbar theme="light" height="80" :color="overlayBgSubColor">
										<v-toolbar-title :class="titleClasses">
											{{ title.title }}
											<v-tooltip activator="parent" :text="`titleId ${title.id}`" location="top"
												open-delay="500"></v-tooltip>

											<div class="text-overline d-block">
												{{ mediaType }} • {{ releaseYear }} • {{ popularRating }}
											</div>
										</v-toolbar-title>
										<template v-slot:append>
											<v-btn icon="mdi-close" @click="(value = false)" variant="text"></v-btn>
										</template>
									</v-toolbar>

									<!-- bottom content -->
									<div class="poster-overlay__bottom w-100"
										:style="`background-color:${overlayBgSubColor}`">

										<div class="d-inline">
											<v-container>
												<v-row>
													<v-col class="text-left">

														<v-rating v-model="rating" hover clearable
															:density="ratingDensity"
															active-color="yellow-accent-4"></v-rating>

													</v-col>
													<v-col class="text-right">

														<v-btn @click="toggleQueued()" icon variant="plain"
															:size="buttonSize">
															<v-icon :class="queued ? 'queued' : ''">mdi-fire</v-icon>
															<v-tooltip activator="parent" text="Queue to watch next"
																location="top" open-delay="500"></v-tooltip>
														</v-btn>

														<v-btn @click="toggleWatched()" icon variant="plain"
															:size="buttonSize">
															<v-icon
																:class="watched ? 'complete' : ''">mdi-check-bold</v-icon>
															<v-tooltip activator="parent" text="Mark Watched"
																location="top" open-delay="500"></v-tooltip>
														</v-btn>

														<v-btn @click="toggleFavorite()" icon variant="plain"
															:size="buttonSize">
															<v-icon
																:class="favorite ? 'favorite' : ''">mdi-star</v-icon>
															<v-tooltip activator="parent" text="Add to Favorites"
																location="top" open-delay="500"></v-tooltip>
														</v-btn>

													</v-col>
												</v-row>
											</v-container>
										</div>
									</div>

								</div>

							</v-img>

						</v-row>
						<v-row>

							<v-col cols="12" class="align-self-center pa-3">

								<v-row>
									<v-col align-self="center" class="text-body-2 pt-8">
										{{ summary }}
									</v-col>
								</v-row>

								<v-row>
									<v-col align-self="center">
										<GenreSetV2 v-bind:genres="genres" :buttonSize="smallButtonSize" />
									</v-col>
								</v-row>

							</v-col>
						</v-row>
					</v-container>
				</v-card-text>

				<v-card-actions>

					<div class="d-inline-flex flex-wrap w-100">

						<div class="flex-wrap px-2 py-3" :class="actionTopRowClass">
							<Streaming v-if="hasStreamingInfo" :infos="streamingInfo" :buttonSize="buttonSize" />
						</div>

						<div class="d-flex ml-auto mr-0 px-2 py-3">

							<v-spacer></v-spacer>
							<v-btn v-if="isDeleteEnabled" @click="confirmDelete" :size="buttonSize" color="error"
								variant="flat" :disabled="isLoading">
								Delete
							</v-btn>

							<v-btn @click="closeDialog" :size="buttonSize" :disabled="isLoading">Cancel</v-btn>

							<v-btn @click.prevent="save()" :size="buttonSize" color="secondary" type="submit"
								variant="flat" :disabled="isLoading" :loading="isLoading">Save</v-btn>
						</div>
					</div>

				</v-card-actions>
			</v-card>
		</v-dialog>

		<SimpleAlert v-model="alert" :titleText="alertTitle" :messageText="alertMessage" :cancelText="cancelText"
			@confirm-alert="closeAlertWithConfirm()" @cancel-alert="closeAlert()" />
	</v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Ref, type PropType } from 'vue'
import { useTheme } from 'vuetify'
import { useDisplay } from 'vuetify'
import { useMainStore } from '@/store/'
import type TitleBase from '@/models/titleBase'
import type UserTitleData from '@/dto/userTitleData'
import type StreamingInfo from '@/models/streamingInfo'
import { MediaType } from '@/models/enum'
import { formatYear } from '@/helpers/format'
import Streaming from '@/components/title/Streaming.vue'
import GenreSetV2 from '@/components/title/GenreSetV2.vue'
import SimpleAlert from '@/components/SimpleAlert.vue'
import StreamingAvailabilityApi from '@/services/StreamingAvailabilityApi'

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	title: {
		type: Object as PropType<TitleBase>,
		required: true
	},
	isDeleteEnabled: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update:modelValue', 'saveTitleData', 'deleteTitle', 'clearSelectionData'])

const value = computed({
	get() {
		return props.modelValue
	},
	set(val: Boolean) {
		emit('update:modelValue', val)
	}
})

const store = useMainStore()
const { name } = useDisplay()
const theme = useTheme()

const isThemeDark = computed(() => {
	return theme.global.current.value.dark
})

// USER INPUT - TODO combine as reactive obj if they're not treated separately
const queued = ref(false)
const favorite = ref(false)
const watched = ref(false)
const rating = ref(0)

// STREAMING INFO
const streamingInfo: Ref<StreamingInfo[]> = ref([])

const hasStreamingInfo = computed(() => {
	return streamingInfo.value.length > 0
})

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

const mediaType = computed(() => {
	return props.title.mediaType == MediaType.Movie ? 'Movie' : props.title.mediaType == MediaType.TV ? 'TV' : ''
})

const genres = computed(() => {
	return props.title.genres
})

const summary = computed(() => {
	return props.title.summary
})

const releaseYear = computed(() => {
	return formatYear(props.title.releaseDate)
})

const popularRating = computed(() => {
	return 'IMDB ' + String(props.title.popularRating?.toFixed(2))
})

// ALERT MODAL
const alert = ref(false)
const alertTitle = `Confirm`
const cancelText = `Nevermind`

const alertMessage = computed(() => {
	return `Are you sure you want to delete ${props.title.title}?`
})

// POSTER
const posterPath = computed(() => {
	return `${import.meta.env.VITE_POSTER_BASE_PATH}${props.title.poster}`
})

const posterCover = computed(() => {
	return isSmallScreen.value
})

const posterHeight = computed(() => {
	return isSmallScreen.value ? '' : '900'
})

// DIALOG MANAGEMENT
const isSmallScreen = computed(() => {
	return ['xs', 'sm'].includes(name.value)
})

const isVerySmallScreen = computed(() => {
	return name.value == 'xs'
})

const maxWidth = computed(() => {
	return isSmallScreen.value ? '' : '800'
})

const height = computed(() => {
	return isSmallScreen.value ? '' : '70vh'
})

const dialogClasses = computed(() => {
	return isSmallScreen.value ? 'pa-0 ma-0' : 'pa-10'
})

const overlayBgColor = computed(() => {
	return isThemeDark.value ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'
})

const overlayBgSubColor = computed(() => {
	return isThemeDark.value ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.6)'
})

const titleClasses = computed(() => {
	return isVerySmallScreen.value ? 'text-overline-lg mt-2 mx-4' : 'text-h5 mt-7 mx-6'
})

const ratingDensity = computed(() => {
	return isVerySmallScreen.value ? 'compact' : 'comfortable'
})

const actionTopRowClass = computed(() => {
	return isSmallScreen.value ? 'mt-0' : 'mt-3'
})

const buttonSize = computed(() => {
	return isVerySmallScreen.value ? 'small' : 'default'
})

const smallButtonSize = computed(() => {
	return isVerySmallScreen.value ? 'x-small' : 'small'
})

const closeDialog = () => {
	emit('update:modelValue', false)
}

const confirmDelete = () => {
	alert.value = true
}

const closeAlert = () => {
	alert.value = false
}

const closeAlertWithConfirm = async () => {
	alert.value = false
	emit('deleteTitle', props.title.id)
	closeDialog()
}

const save = async () => {

	const userData = {
		queued: queued.value,
		favorite: favorite.value,
		watched: watched.value,
		rating: rating.value,
	} as UserTitleData

	emit('saveTitleData', userData, props.title.id)
	closeDialog()
}

const reset = () => {
	queued.value = props.title.queued
	favorite.value = props.title.favorite
	watched.value = props.title.watched
	rating.value = props.title.rating
}

watch(() => props.title, (newValue) => {
	if (!!newValue?.title) {
		StreamingAvailabilityApi.getStreamingInfo(newValue.movieDbId, newValue.mediaType)
			.then(res => {
				streamingInfo.value = res
			})
			.catch(error => {
				console.error(error?.message ?? `encountered unexpected error fetching streaming info`)
			})
	} else {
		streamingInfo.value = []
	}
})

watch(() => props.modelValue, (newValue) => {
	if (newValue) {
		reset()
	} else {
		emit('clearSelectionData')
	}
})

</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/main';
@import '@/assets/modal';

.poster-overlay__bottom {
	position: absolute;
	bottom: 0;
}
</style>
