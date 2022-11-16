<template>
	<v-col cols="12" sm="4">
		<v-card height="300px">
			<v-card-title>
				{{ title }}
			</v-card-title>
			<v-card-text>
				{{ text }}
				<v-spacer></v-spacer>
				<slot></slot>
			</v-card-text>
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