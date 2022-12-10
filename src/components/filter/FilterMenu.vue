<template>


	<v-btn icon @click.stop="value = !value">
		<v-icon :color="!isUnfiltered ? `secondary` : ``">mdi-tune</v-icon>
	</v-btn>

	<NavigationDrawer v-model="value" :title="`Filter by:`" :buttons="buttons">
		<template v-slot:content>
			<PersonalFilterMenu v-model="subMenuPersonal" />
			<MediaFilterMenu v-model="subMenuMedia" />
			<GenreFilterMenu v-model="subMenuGenre" />
		</template>
	</NavigationDrawer>



	<!-- <v-menu v-model="value" :open-delay="0" :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<v-btn icon v-bind="props">
				<v-icon :color="!isUnfiltered ? `secondary` : ``">mdi-tune</v-icon>
			</v-btn>
		</template>

		<v-card min-width="300" class="pa-4">

			<v-row>
				<v-col cols="12">
					<div class="text-button">
						Filter by:
					</div>
				</v-col>
			</v-row>

			<v-divider class="my-2"></v-divider>

			<PersonalFilterMenu v-model="subMenuPersonal" />
			<MediaFilterMenu v-model="subMenuMedia" />
			<GenreFilterMenu v-model="subMenuGenre" />

			<v-divider class="my-2"></v-divider>

			<v-card-actions>
				<v-row>
					<v-col cols="12">
						<v-btn rounded variant="outlined" class="px-4" :disabled="isUnfiltered" @click="resetFilter()"
							:text="!isUnfiltered" width="100%">
							{{ `${isUnfiltered ? 'Showing All' : 'Show All'}` }}</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-card>

	</v-menu> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFilterStore } from '@/store/filter'
import type { Button } from '@/models/button'
import PersonalFilterMenu from '@/components/filter/PersonalFilterMenu.vue'
import MediaFilterMenu from '@/components/filter/MediaFilterMenu.vue'
import GenreFilterMenu from '@/components/filter/GenreFilterMenu.vue'
import NavigationDrawer from '@/components/filter/NavigationDrawer.vue'

const filter = useFilterStore()

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

const buttons: Button[] = [
	{
		text: () => { return `${isUnfiltered ? 'Showing All' : 'Show All'}` },
		onClick: () => { resetFilter() },
		isDisabled: () => { return isUnfiltered.value },
		prependIcon: undefined
	},
]

const subMenuPersonal = ref(false)
const subMenuMedia = ref(false)
const subMenuGenre = ref(false)

const isUnfiltered = computed(() => {
	return !filter.filterByWatched && !filter.filterByFavorite && !filter.filterByUpNext && !filter.filterToTv && !filter.filterToMovies && !filter.genreFilter?.name
})

const resetFilter = () => {
	filter.resetFilter()
}

</script>