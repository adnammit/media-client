<template>
	<v-sheet rounded="lg">
		<v-list rounded="lg">
			<v-list-item v-for="(item, i) in links" :key="i" :value="item" @click=changeSubject(item.subject)>
				<template v-slot:prepend>
					<v-icon :icon="item.icon"></v-icon>
				</template>
				<v-list-item-title>
					{{ item.text }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'

export default defineComponent({
	name: 'FeedBar',
	data() {
		return {
			links: [
				{ subject: '', text: 'The Feed', icon: 'mdi-comment-quote-outline' },
				{ subject: 'Cow', text: 'Cows', icon: 'mdi-cow' },
				{ subject: 'Tack', text: 'Tack', icon: 'mdi-horseshoe' },
				{ subject: 'Rodeo', text: 'Rodeo', icon: 'mdi-horse-human' },
			]
		}
	},
	methods: {
		changeSubject(subject: string) {
			this.mainStore.changeSubject(subject)
			if (!this.$route.matched.some(({name}) => name === 'feed'))
			{
				this.$router.push({ name: 'feed' })
			}
		}
	},
	setup() {
		const mainStore = useMainStore()
		return { mainStore }
	}
})
</script>