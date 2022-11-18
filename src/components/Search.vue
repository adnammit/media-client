<template>
	<v-row justify="center">
		<v-dialog v-model="showDialog" scrollable max-width="50vw">
			<v-card>
				<v-card-title>Search Results</v-card-title>
				<v-divider></v-divider>
				<v-card-text class="search-table" style="height: 60vh;">
					<v-simple-table>
						<template v-slot:default>
							<thead>
								<!-- <tr>
									checkbox: add
									<th class="text-center">Title</th>
									type
									date
									rating
									genres
									mark as watched
									mark as favorite
								</tr> -->
							</thead>
							<tbody>
								<tr v-for="item in results" :key="item.id">
									<td>{{ item.title }}</td>
									<td>
										<div class="my-2">
											<v-btn small color="primary" @click="addItem(item)">Save</v-btn>
										</div>
									</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click.stop="closeDialog">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { useFilterStore } from '@/store/filter'
import type SearchResult from '@/models/SearchResult'


// implement these too:
	// private set showDialog(value: boolean) {
	// 	this.$emit('input', value);
	// }

	// private closeDialog() {
	// 	this.showDialog = false;
	// }


	// private addItem(item: SearchResult) {
	// 	AppModule.addSearch(item);
	// }

	// @Watch('value')
	// onValueChanged() {
	// 	if (!this.value) {
	// 		FilterModule.clearSearch();
	// 	}
	// }

export default defineComponent({
	props: {
		value: Boolean,
	},
	computed: {
		showDialog(): boolean {
			return this.value
			// emit?
		},
		results(): SearchResult[] {
			return this.filterStore.results
		},
	},
	setup() {
		const mainStore = useMainStore()
		const filterStore = useFilterStore()
		return { mainStore, filterStore }
	},
})
</script>
