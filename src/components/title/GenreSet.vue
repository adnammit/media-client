<template>
	<div class="genre-set align-center d-inline">
		<template v-for="item in items">
			<GenreDisplay v-if="getGenreMatch(item.genres)" :icon="item.icon" :text="item.name" />
		</template>
		<!-- <v-tooltip top open-delay="300" v-if="getGenreMatch('Action')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="car-crash" size="lg" />
			</template>
			<span>Action</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch(['Adventure', 'Action & Adventure'])">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="hiking" size="lg" />
			</template>
			<span>Adventure</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Animation')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="paint-brush" size="lg" />
			</template>
			<span>Animation</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Comedy')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="laugh-beam" size="lg" />
			</template>
			<span>Comedy</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Crime')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="gavel" size="lg" />
			</template>
			<span>Crime</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Documentary')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="film" size="lg" />
			</template>
			<span>Documentary</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Drama')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="theater-masks" size="lg" />
			</template>
			<span>Drama</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch(['Family', 'Kids'])">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="baby" size="lg" />
			</template>
			<span>Kids</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Fantasy')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="hat-wizard" size="lg" />
			</template>
			<span>Fantasy</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('History')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="scroll" size="lg" />
			</template>
			<span>History</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Horror')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="skull" size="lg" />
			</template>
			<span>Horror</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Music')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="music" size="lg" />
			</template>
			<span>Music</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Mystery')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="question-circle" size="lg" />
			</template>
			<span>Mystery</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('News')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="newspaper" size="lg" />
			</template>
			<span>News</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Reality')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="camera" size="lg" />
			</template>
			<span>Reality</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Romance')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="heart" size="lg" />
			</template>
			<span>Romance</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch(['Science Fiction', 'Sci-Fi & Fantasy'])">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="robot" size="lg" />
			</template>
			<span>Sci-Fi</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Soap')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="soap" size="lg" />
			</template>
			<span>Soap</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Talk')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="microphone-alt" size="lg" />
			</template>
			<span>Talk</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('TV Movie')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="tv" size="lg" />
			</template>
			<span>TV Movie</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Thriller')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="exclamation-triangle" size="lg" />
			</template>
			<span>Thriller</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch(['War', 'War & Politics'])">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="fighter-jet" size="lg" />
			</template>
			<span>War</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Western')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="hat-cowboy-side" size="lg" />
			</template>
			<span>Western</span>
		</v-tooltip> -->
	</div>
</template>


<script setup lang="ts">
import type Genre from '@/models/genre'
import GenreDisplay from '@/components/title/GenreDisplay.vue'

const items = [
	{
		icon: 'car-crash',
		name: 'Action',
		genres: [ 'Action' ]
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
	// TODO the rest
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
