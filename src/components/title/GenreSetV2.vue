<template>
	<div class="genre-set align-center d-inline">
		<template v-for="item in items">
			<v-chip v-if="getGenreMatch(item.genres)" rounded="pill" :size="buttonSize" variant="tonal" class="mx-1">
				<template v-slot:prepend>
					<font-awesome-icon :icon="item.icon" />
				</template>
				{{ item.name }}
			</v-chip>
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
	buttonSize: {
		type: String,
		default: 'small'
	}
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
