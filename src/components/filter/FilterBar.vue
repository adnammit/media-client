<template>
	<div class="container-fluid">

		<v-toolbar class="px-0 filter-bar" density="compact">

			<SearchMenu v-model="searchMenu" />

			<FindMenu v-model="findMenu" />

			<ListMenu v-model="listMenu" />

			<Random />

			<v-spacer></v-spacer>

			<SortMenu v-model="sortMenu" />

			<FilterMenu v-model="filterMenu" />

		</v-toolbar>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchMenu from '@/components/filter/SearchMenu.vue'
import FindMenu from '@/components/filter/FindMenu.vue'
import ListMenu from '@/components/filter/ListMenu.vue'
import Random from '@/components/filter/Random.vue'
import SortMenu from '@/components/filter/SortMenu.vue'
import FilterMenu from '@/components/filter/FilterMenu.vue'

const searchMenu = ref(false)
const findMenu = ref(false)
const listMenu = ref(false)
const sortMenu = ref(false)
const filterMenu = ref(false)

</script>

<style scoped lang="scss">
@import '@/assets/colors';

.filter-bar {
	width: 100vw;
	position: fixed;
	z-index: 1;
	margin-left: -4px;
}
</style>
