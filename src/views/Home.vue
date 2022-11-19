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


			<v-row justify="center">
				<v-dialog v-model="dialog" persistent>
					<template v-slot:activator="{ props }">
						<v-btn color="primary" v-bind="props">
							Open Dialog
						</v-btn>
					</template>
					<v-card>
						<v-card-title class="text-h5">
							Use Google's location service?
						</v-card-title>
						<v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google,
							even when no apps are running.</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green-darken-1" variant="text" @click="sayHello()">
								Disagree
							</v-btn>
							<v-btn color="green-darken-1" variant="text" @click="sayHello">
								Agree
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>

		</v-container>
	</PageLayout>
</template>

<script setup lang="ts">
import HomeItem from '@/components/HomeItem.vue'
import PageLayout from '@/components/navigation/PageLayout.vue'
import { ref } from 'vue';


const dialog = ref(false)
const sayHello = () => {
	console.log('>> HELLO alert ');
	// alert.value = true
	dialog.value = false
}



const homeItems = [
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
]

</script>