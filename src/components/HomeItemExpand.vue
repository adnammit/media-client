<template>
	<v-col xs="12" md="4">
		<v-card>
			<v-card-title>
				{{ title }}
			</v-card-title>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn flat :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
			</v-card-actions>

			<v-expand-transition>
				<div v-show="show">
					<v-card-text>
						{{ text }}
					</v-card-text>
					<v-spacer></v-spacer>
					<slot></slot>
				</div>
			</v-expand-transition>

			<!-- <v-card-text>
				<v-row align="center" hide-gutters no-gutters>
					<v-col cols="12">
						{{ text }}
					</v-col>
					<v-col cols="12">
						<slot></slot>
					</v-col>

				</v-row>
			</v-card-text> -->

		</v-card>
	</v-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		title: String,
		text: String
	},
	data() {
		return {
			show: false
		}
	},
})

</script>