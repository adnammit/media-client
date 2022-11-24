<template>

	<v-card class="bump-animation" @click="onClick" max-height="200px">
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

</template>

<script setup lang="ts">
import { formatYear } from '@/filters/format'
import Title from '@/models/title'

const props = defineProps({
	title: {
		type: Title,
		required: true
	},
})

const emit = defineEmits(['selectTitleUpdate'])

const year = formatYear(props.title.releaseDate)
const posterUrl = `${import.meta.env.VITE_POSTER_BASE_PATH}${props.title.poster}`

const onClick = () => {
	emit('selectTitleUpdate', props.title)
}

</script>
