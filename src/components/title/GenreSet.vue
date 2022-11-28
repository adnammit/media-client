<template>
	<div class="genre-set align-center d-inline">
		<template v-for="item in items">
			<v-tooltip v-if="getGenreMatch(item.genres)" :text="item.name" location="top" open-delay="300">
				<template v-slot:activator="{ props }">
					<font-awesome-icon v-bind="props" :icon="item.icon" size="lg" />
				</template>
			</v-tooltip>
		</template>
	</div>
</template>

<script setup lang="ts">
import type Genre from '@/models/genre'

const items = [
	{
		icon: 'car-crash',
		name: 'Action',
		genres: ['Action']
	},
	{
		icon: 'hiking',
		name: 'Adventure',
		genres: ['Adventure', 'Action & Adventure']
	},
	{
		icon: 'paint-brush',
		name: 'Animation',
		genres: ['Animation']
	},
	{
		icon: 'laugh-beam',
		name: 'Comedy',
		genres: ['Comedy']
	},
	{
		icon: 'gavel',
		name: 'Crime',
		genres: ['Crime']
	},
	{
		icon: 'film',
		name: 'Documentary',
		genres: ['Documentary']
	},
	{
		icon: 'theater-masks',
		name: 'Drama',
		genres: ['Drama']
	},
	{
		icon: 'baby',
		name: 'Kids',
		genres: ['Family', 'Kids']
	},
	{
		icon: 'hat-wizard',
		name: 'Fantasy',
		genres: ['Fantasy']
	},
	{
		icon: 'scroll',
		name: 'History',
		genres: ['History']
	},
	{
		icon: 'skull',
		name: 'Horror',
		genres: ['Horror']
	},
	{
		icon: 'music',
		name: 'Music',
		genres: ['Music']
	},
	{
		icon: 'question-circle',
		name: 'Mystery',
		genres: ['Mystery']
	},
	{
		icon: 'newspaper',
		name: 'News',
		genres: ['News']
	},
	{
		icon: 'camera',
		name: 'Reality',
		genres: ['Reality']
	},
	{
		icon: 'heart',
		name: 'Romance',
		genres: ['Romance']
	},
	{
		icon: 'robot',
		name: 'Sci-Fi',
		genres: ['Science Fiction', 'Sci-Fi & Fantasy']
	},
	{
		icon: 'soap',
		name: 'Soap',
		genres: ['Soap']
	},
	{
		icon: 'microphone-alt',
		name: 'Talk',
		genres: ['Talk']
	},
	{
		icon: 'tv',
		name: 'TV Movie',
		genres: ['TV Movie']
	},
	{
		icon: 'exclamation-triangle',
		name: 'Thriller',
		genres: ['Thriller']
	},
	{
		icon: 'fighter-jet',
		name: 'War and Politics',
		genres: ['War', 'War & Politics']
	},
	{
		icon: 'hat-cowboy-side',
		name: 'Western',
		genres: ['Western']
	},
]

const props = defineProps({
	genres: {
		type: Array<Genre>,
		required: true
	},
})

const getGenreMatch = (val: string | string[]) => {
	const genre = typeof val == 'string' ? [val] : val
	if (props.genres) {
		return genre.some(g => props.genres.some(gg => gg.name == g))
	}
	return false
}

</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/main';

.genre-set:deep {
	display: inline-flex;

	.svg-inline--fa {
		margin: 3px 5px auto;
	}
}
</style>
