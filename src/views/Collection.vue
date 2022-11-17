<template>
	<PageLayout>
		<div class="text-h2 mt-6">
			{{ title }}
		</div>
		<div class="text-body-1">
			{{ subtitle }}
		</div>

		<v-container fluid v-if="hasContent">
			<v-row dense>
				<v-col v-for="(item, index) in filteredContent" :key="item.id" xs="12" sm="6" md="3" xl="2">
					<CollectionItemDisplay :title="item.title" :summary="item.summary"
						:poster="item.poster" :released="item.released" />
				</v-col>
			</v-row>
		</v-container>

		<div v-else class="text-center py-7 my-9">
			<div class="font-weight-light text-h5">
				You don't have anything saved yet
			</div>
			<div class="font-weight-light text-h3">
				<br />
				<v-icon icon="mdi-sail-boat" size="x-large" class="mb-5"></v-icon>

				<!-- idk just messin -->
				<!-- <v-icon icon="mdi-moon-waning-crescent" size="medium"></v-icon>
					<v-icon icon="mdi-moon-last-quarter" size="medium"></v-icon>
					<v-icon icon="mdi-moon-waning-gibbous" size="medium"></v-icon>
					<v-icon icon="mdi-moon-full" size="medium"></v-icon>
					<v-icon icon="mdi-moon-waxing-gibbous" size="medium"></v-icon>
					<v-icon icon="mdi-moon-first-quarter" size="medium"></v-icon>
					<v-icon icon="mdi-moon-waxing-crescent" size="medium"></v-icon> -->
			</div>
			<div class="text-overline">Search for a title to start</div>
		</div>

	</PageLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import PageLayout from '@/components/navigation/PageLayout.vue'
import type Title from '@/models/title'
import CollectionItemDisplay from '@/components/CollectionItemDisplay.vue'

export default defineComponent({
	name: 'Collection',
	components: { PageLayout, CollectionItemDisplay },
	computed: {
		title(): string {
			return 'My Collection'
			// return `${this.mainStore.filterSubject == '' ? 'The' : this.mainStore.filterSubject} Feed`;
		},
		subtitle(): string {
			return `Browse what's UpNext`
			// return `All the latest in ${this.mainStore.filterSubject == '' ? 'Cowpoke' : this.mainStore.filterSubject} news!`
		},
		hasContent(): boolean {
			return this.filteredContent.length > 0
		},
		filteredContent(): Title[] {
			// return [] // test 'no-content'
			return this.mainStore.collection
			// return this.mainStore.collection.filter(f => f.text != '')
		}
	},
	setup() {
		const mainStore = useMainStore()
		return { mainStore }
	},
	created() {
		this.mainStore.loadCollection()
	}
})
</script>
