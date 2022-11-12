<template>

	<v-card class="mx-1 my-3 py-3" @click="dialog = true" max-height="300px">
		<v-img :src="imgUrl" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px"
			cover>

			<v-card-title class="text-button text-no-wrap text-color--contrast">
				{{ title }}
			</v-card-title>
			<v-card-subtitle class="pb-3 text-color--contrast">2008</v-card-subtitle>
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

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { useDisplay } from 'vuetify'

export default defineComponent({
	props: {
		title: String,
		text: String,
		author: String,
		imgUrl: String
	},
	data() {
		return {
			dialog: false,
			maxPreviewWordLength: 75
		}
	},
	computed: {
		quickText(): string {
			let words = this.text?.split(' ') ?? []
			if (words?.length > this.maxPreviewWordLength) {
				words = words.slice(0, this.maxPreviewWordLength)
				words.push('(...)')
			}
			return words.join(' ')
		},
		width(): string {
			return (this.isSmallScreen) ? '90%' : '60%'
		},
		imgSizeThm(): string {
			return (this.isSmallScreen) ? '100%' : '175'
		},
		imgSizeFull(): string {
			return (this.isSmallScreen) ? '75vw' : '275'
		},
		isSmallScreen(): boolean {
			return this.name == 'xs'
		}
	},
	setup() {
		const mainStore = useMainStore()
		const { name } = useDisplay()
		return { mainStore, name }
	}
})
</script>
