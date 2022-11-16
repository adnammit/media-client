<template>
	<PageLayout>
		<v-card class="pa-6" :width="width">
			<v-form ref="form" lazy-validation @submit.prevent="tryLogin" :disabled="loading">

				<v-container fluid>
					<v-row justify="center">
						<v-col cols="12">

							<div class="my-5 text-h5">
								Welcome back! 👋
							</div>

							<v-alert type="info" class="my-5" variant="tonal">
								Use demo mode to quickly see what UpNext is all about, or create your own account and start from scratch.
								<v-row justify="space-between" class="mt-2" hide-gutters no-gutters>
									<v-col xs="12" sm="6">
										<v-spacer></v-spacer>
									</v-col>
									<v-col xs="12" sm="6" align="right">
										<v-btn color="info" variant="outlined" @click="demo">Demo Mode!</v-btn>
									</v-col>
								</v-row>
							</v-alert>

							<v-alert :style="{ visibility: errorMessage ? 'visible' : 'hidden' }" type="error"
								class="my-5" density="compact">
								{{ errorMessage }}
							</v-alert>

							<v-text-field v-model="username" :counter="50" label="Username" required clearable
								variant="outlined" @click="clearError">
							</v-text-field>

							<v-text-field v-model="email" label="E-mail" required clearable variant="outlined"
								@click="clearError">
							</v-text-field>

							<v-row justify="space-between" class="my-5">
								<v-col xs="12" sm="6">
									<v-btn block flat color="secondary" :loading="loading" :disabled="!canSubmit"
										class="text-color--contrast" @click="validate" type="submit">Log In</v-btn>
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
import { defineComponent } from 'vue'
import { useDisplay } from 'vuetify'
import { useMainStore } from '@/store'
import PageLayout from '@/components/navigation/PageLayout.vue'
import MediaProvider from '@/services/MediaProvider';

export default defineComponent({
	name: 'LogIn',
	components: { PageLayout },
	data: () => ({
		username: '',
		email: '',
		errorMessage: '',
		loading: false,
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

			this.loading = true

			// // test loading
			// function timeout(ms: any) {
			// 	return new Promise(resolve => setTimeout(resolve, ms));
			// }
			// await timeout(5000)

			const user = await MediaProvider.getUser(this.username, this.email)

			if (!!user && user.username) {
				this.mainStore.login(user)
				this.$router.push({ path: '/collection' })
			} else {
				this.errorMessage = 'Login failed'
			}

			this.loading = false
		},
		signup() {
			this.$router.push({ path: '/signup' })
		},
		async demo() {
			this.loading = true

			const user = await MediaProvider.getUser('test', 'test@test.com')

			if (!!user && user.username) {
				this.mainStore.login(user)
				this.$router.push({ path: '/collection' })
			} else {
				this.errorMessage = 'Demo login failed'
			}

			this.loading = false
		}
	},
	computed: {
		form(): any {
			return this.$refs.form as InstanceType<typeof FormData>;
		},
		canSubmit(): boolean {
			return !!this.username && !!this.email && !this.loading
		},
		width(): string {
			return this.name == 'xs' ? '95vw' : '500px'
		},
	},
	setup() {
		const mainStore = useMainStore()
		const { name } = useDisplay()
		return { mainStore, name }
	}
})
</script>