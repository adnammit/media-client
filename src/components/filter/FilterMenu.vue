<template>

	<v-btn icon @click.stop="value = !value" variant="text">
		<v-icon :color="!isUnfiltered ? `secondary` : ``">mdi-tune</v-icon>
	</v-btn>

	<NavigationDrawer v-model="value" :title="`Filter Options`" :buttons="buttons" :location="`end`">
		<template v-slot:content>
			<PersonalFilterMenu v-model="subMenuPersonal" />
			<MediaFilterMenu v-model="subMenuMedia" />
			<GenreFilterMenu v-model="subMenuGenre" />
		</template>
	</NavigationDrawer>

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
		text: `Show All`,
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