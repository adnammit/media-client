<template>
	<PageLayout>

		<div class="text-center my-8">
			<div class="text-h1">
				<v-icon icon="mdi-chevron-triple-left" size="small"></v-icon>
				UpNext
			</div>
			<div class="text-h5">Delivering sanity in a world of too many f&#38;#%ing choices</div>
		</div>

		<v-container class="mt-8">
			<v-row justify="center">
				<template v-for="item in homeItems">
					<HomeItem :title="item.title" :text="item.text">
						<v-btn class="ma-2 text-color--contrast" :color="item.color" :icon="item.icon" size="x-large"
							:to="item.route">
						</v-btn>
					</HomeItem>
				</template>
			</v-row>
		</v-container>
	</PageLayout>
</template>

<script lang="ts">
import HomeItem from '@/components/HomeItem.vue'
import PageLayout from '@/components/navigation/PageLayout.vue'

export default {
	name: "Home",
	components: { HomeItem, PageLayout },
	data() {
		return {
			homeItems:
				[
					{
						title: 'What is UpNext?',
						text: ['UpNext allows you to keep a list of items to watch and see what platforms they\'re available on.', 'Sign up to get started!'],
						icon: 'mdi-arrow-right-circle',
						color: 'info',
						route: '/signup'
					},
					{
						title: 'Why is UpNext?',
						text: ['Because keeping track of what you want to watch across multiple subscription services is a terrible way to live your life.', 'And when you can\'t decide what to watch, let our Randomizer pick for you!'],
						icon: 'mdi-dice-5',
						color: 'warning',
						route: '/collection' // TODO: generate a random movie?
					},
					{
						title: 'How is UpNext?',
						text: ['UpNext is a personal portfolio project, not a Real Thing, but feel free to check it out!', 'Read more about UpNext below.'],
						icon: 'mdi-help-circle',
						color: 'secondary',
						route: '/about'
					},
				],
		}
	}
}
</script>