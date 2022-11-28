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
import { genres } from '@/helpers/genre'

const items = genres

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
