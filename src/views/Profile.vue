<template>
	<PageLayout>
		<v-card class="pa-6">
		<!-- <v-card class="pa-6" max-width="80%" min-width="500px"> -->
			<v-form ref="form" lazy-validation @submit.prevent="updateProfile">
				<v-container fluid>
					<v-row justify="center">
						<v-col cols="12">

							<v-row align="center" justify="center">
								<v-col align="center" xs="12" md="6">
									<v-card-title class="text-h3">
										{{ fullName }}
									</v-card-title>
									<v-card-subtitle>
										{{ username }}
										<br />
										{{ email }}
									</v-card-subtitle>

								</v-col>
								<v-col align="center" xs="12" md="6">
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

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import PageLayout from '@/components/navigation/PageLayout.vue'
import vibrates from '@/assets/vibrates.png'
import ImgUtil from '@/filters/img-util'

export default defineComponent({
	name: 'Profile',
	components: { PageLayout },
	computed: {
		username(): string { return this.mainStore.username },
		fullName(): string { return this.mainStore.fullName },
		email(): string { return this.mainStore.email },
		avatar(): string {
			const imgUrl = this.mainStore.user?.imgUrl as string
			return (ImgUtil.isValidImage(imgUrl)) ? imgUrl : vibrates
		},
		form(): any {
			return this.$refs.form as InstanceType<typeof FormData>;
		},
		// canSubmit(): boolean {
		// 	return !!this.username && !!this.email
		// },
	},
	data() {
		return {
			vibrates: vibrates,
			bio: 'stuff about me'
		}
	},
	methods: {
		// validate() {
		// 	this.form.validate()
		// },
		reset() {
			this.form.reset()
		},
		// clearError() {
		// 	this.errorMessage = ''
		// },
		async updateProfile() {

			// const user = await MediaProvider.getUser(this.username, this.email)

			// if (!!user && user.username) {
			// 	this.mainStore.login(user)
			// 	this.$router.push({ path: '/collection' })
			// } else {
			// 	this.errorMessage = 'Login failed'
			// }
		},
	},
	setup() {
		const mainStore = useMainStore()
		return { mainStore }
	}
})
</script>