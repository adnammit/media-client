<template>

	<v-card class="my-3 bump-animation" @click="dialog = true" max-height="200px">
		<v-img :src="posterUrl" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px"
			cover>

			<v-card-title class="text-button text-no-wrap text-color--contrast">
				{{ props.title.title }}
			</v-card-title>
			<v-card-subtitle class="pb-3 font-weight-bold text-color--contrast">
				{{ year }}
			</v-card-subtitle>
			<v-card-text>
				<v-container class="px-0">
					<v-row align="center" no-gutters>
						<!-- <v-col align="left" class="flex-grow-1 flex-shrink-0 pr-5">
						<span style="white-space: pre-wrap;">
							{{ quickText }}
						</span>
					</v-col> -->

						<!-- <v-col align="right" cols="12" sm="4" md="3" class="py-5">
							<v-img cover aspect-ratio="1" :src="imgUrl" class="rounded-xl" :max-height="imgSizeThm"
								:max-width="imgSizeThm">
							</v-img>
						</v-col> -->

					</v-row>
				</v-container>
			</v-card-text>
		</v-img>
	</v-card>

	<MediaDetail v-model="dialog" :userTitle="props.title"/>

	<!-- <v-dialog v-model="dialog" scrollable :width="width">
		<v-card>
			<v-card-title>{{ title }}</v-card-title>
			<v-divider></v-divider>
			<v-card-text style="height: 50vh;">
				<div class="subtitle--emphasis pb-3">
					{{ author }}
				</div>
				<v-img cover aspect-ratio="1" :src="imgUrl" class="rounded-xl ml-3 mb-3"
					:class="{ 'float-right': !isSmallScreen }" :height="imgSizeFull" :width="imgSizeFull"></v-img>
				<span style="white-space: pre-wrap;">
					{{ text }}
				</span>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn variant="tonal" @click="dialog = false">
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog> -->

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '@/store'
import { formatYear } from '@/filters/format'
import Title from '@/models/title'
import MediaDetail from '@/components/title/MediaDetail.vue'

const props = defineProps({
	title: {
		type: Title,
		required: true
	},
})


// const itemProps = defineProps({
// 	title: String,
// 	summary: String,
// 	releaseDate: Date,
// 	poster: String
// })

const store = useMainStore()
const dialog = ref(false)

const year = formatYear(props.title.releaseDate)
const posterUrl = `${import.meta.env.VITE_POSTER_BASE_PATH}${props.title.poster}`

</script>
