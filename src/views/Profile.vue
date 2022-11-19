<template>
	<PageLayout>
		<v-card class="my-5 pa-5">
			<!-- <v-card class="pa-6" max-width="80%" min-width="500px"> -->
			<v-form ref="form" lazy-validation @submit.prevent="updateProfile">
				<v-container fluid>
					<v-row justify="center">
						<v-col cols="12">

							<v-row align="center" justify="center">
								<v-col align="center">
									<v-card-title class="text-h5">
										{{ fullName }}
									</v-card-title>

									<v-card-subtitle class="text-overline">
										Username: {{ username }}
										<br />
										Email: {{ email }}
									</v-card-subtitle>

								</v-col>
								<v-col align="center">
									<v-avatar class="ma-6" size="100">
										<v-img alt="Avatar" :src="avatar"></v-img>
									</v-avatar>
								</v-col>
							</v-row>

							<v-card-text class="my-6">
								You can write a bio but it won't save for now.
								<br />
								We'll have more info about you and your preferences here soon
							</v-card-text>

							<v-row justify="center">
								<v-col xs="12">

									<v-textarea label="About Me" variant="outlined" :model-value="bio"></v-textarea>


								</v-col>
							</v-row>

							<!-- <v-row justify="space-between" class="my-5">
								<v-col xs="12" sm="6">
									<v-btn block flat color="secondary" :disabled="!canSubmit" class="text-color--contrast" @click="validate" type="submit">
										Log In</v-btn>
								</v-col>
								<v-col xs="12" sm="6">
									<v-btn block variant="tonal" @click="reset">Reset Form</v-btn>
								</v-col>
							</v-row> -->

						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-card>
	</PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '@/store'
import PageLayout from '@/components/navigation/PageLayout.vue'
import vibrates from '@/assets/vibrates.png'
import ImgUtil from '@/filters/img-util'

const store = useMainStore()
const form = ref<any>(null) // TODO: why you no type??

const username = store.username
const fullName = store.fullName
const email = store.email
const bio = `stuff about me, myself and I`

const imgUrl = store.user?.imgUrl as string
const avatar = (ImgUtil.isValidImage(imgUrl)) ? imgUrl : vibrates

const reset = () => {
	form.value.reset()
}

const updateProfile = () => {
	// const user = await MediaProvider.getUser(this.username, this.email)

	// if (!!user && user.username) {
	// 	this.mainStore.login(user)
	// 	this.$router.push({ path: '/collection' })
	// } else {
	// 	this.errorMessage = 'Login failed'
	// }
}

</script>