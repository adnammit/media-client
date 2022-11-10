<template>
	<PageLayout v-if="error">
		<div class="content-layout">
			<h1 id="page-title" class="content__title">Error</h1>
			<div class="content__body">
				<p id="page-description">
					<span>{{ errorMessage }}</span>
				</p>
			</div>
		</div>
	</PageLayout>
	<div class="page-layout" v-else>
		<NavBar />
		<div class="page-layout__content" />
	</div>
</template>

<script lang="ts">
import PageLayout from '@/components/navigation/PageLayout.vue'
import NavBar from '@/components/navigation/NavBar.vue'
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export default defineComponent({
	name: 'Callback',
	components: {
		PageLayout,
		NavBar,
	},
	computed: {
		errorMessage(): string {
			return this.error.message
		},
	},
	setup() {
		const { error } = useAuth0()
		return { error }
	},
})
</script>


