<template>
	<PageLayout>
		<v-card class="pa-6" max-width="80%" min-width="500px">
			<v-form ref="form" lazy-validation @submit.prevent="tryLogin">

				<v-container fluid>
					<v-row justify="center">
						<v-col cols="12">

							<div class="my-5 text-h5">
								Welcome back! 👋
							</div>

							<v-alert :style="{ visibility: errorMessage ? 'visible' : 'hidden' }" type="error"
								class="my-5" density="compact">
								{{ errorMessage }}
							</v-alert>

							<v-text-field v-model="username" :counter="50" label="Username"
								required variant="outlined" @click="clearError">
							</v-text-field>

							<v-text-field v-model="email" label="E-mail" required variant="outlined" @click="clearError">
							</v-text-field>

							<v-row justify="space-between" class="my-5">
								<v-col xs="12" sm="6">
									<v-btn block flat color="secondary" :disabled="!canSubmit" class="text-color--contrast"
										@click="validate" type="submit">Log In</v-btn>
								</v-col>
								<v-col xs="12" sm="6">
									<v-btn block variant="tonal" @click="reset">Reset Form</v-btn>
								</v-col>
							</v-row>

							<v-row justify="space-between" class="text-center text-overline my-5">
								<v-col xs="12">
									Don't have an account? <a @click="signup">Sign up</a>
								</v-col>
							</v-row>

						</v-col>
					</v-row>
				</v-container>

			</v-form>
		</v-card>
	</PageLayout>
</template>

<script lang="ts">
import PageLayout from '@/components/navigation/PageLayout.vue'
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import MediaProvider from '@/services/MediaProvider';

export default defineComponent({
	name: 'LogIn',
	components: { PageLayout },
	data: () => ({
		username: '',
		email: '',
		errorMessage: '',
	}),
	methods: {
		validate() {
			this.form.validate()
		},
		reset() {
			this.form.reset()
		},
		clearError() {
			this.errorMessage = ''
		},
		async tryLogin() {

			const user = await MediaProvider.getUser(this.username, this.email)

			if (!!user && user.username) {
				this.mainStore.login(user)
				this.$router.push({ path: '/collection' })
			} else {
				this.errorMessage = 'Login failed'
			}
		},
		signup() {
			this.$router.push({ path: '/signup' })
		}
	},
	computed: {
		form(): any {
			return this.$refs.form as InstanceType<typeof FormData>;
		},
		canSubmit(): boolean {
			return !!this.username && !!this.email
		},
	},
	setup() {
		const mainStore = useMainStore()
		return { mainStore }
	}
})
</script>