<template>
	<PageLayout>
		<v-card class="pa-6" :width="width">
			<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="trySignup" :disabled="loading">

				<v-container fluid>
					<v-row justify="center">
						<v-col cols="12">

							<div class="my-5 text-h5">
								Sign up to start tracking what's up next!
							</div>

							<v-alert type="info" class="my-5" variant="tonal">
								Use demo mode to quickly see what UpNext is all about, or create your own account and
								start from scratch.
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

							<v-text-field v-model="username" :counter="50" :rules="defaultRules" label="Username"
								required clearable variant="outlined" @blur="checkUsernameExists"
								@focus="clearSignupFailed">
							</v-text-field>

							<v-text-field v-model="email" :rules="emailRules" label="E-mail" required clearable
								variant="outlined" @blur="checkEmailExists" @focus="clearSignupFailed">
							</v-text-field>

							<v-text-field v-model="firstName" :counter="50" :rules="defaultRules" label="First Name"
								required clearable variant="outlined">
							</v-text-field>

							<v-text-field v-model="lastName" :counter="50" :rules="defaultRules" label="Last Name"
								required clearable variant="outlined">
							</v-text-field>

							<!-- <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
						:type="show ? 'text' : 'password'" name="input-10-1" label="Normal with hint text" hint="At least 8 characters"
						counter @click:append="show = !show"></v-text-field> -->

							<v-row justify="space-between" class="my-5">
								<v-col xs="12" sm="6">
									<v-btn block flat color="secondary" :loading="loading" :disabled="!canSubmit"
										class="text-color--contrast" @click="validate" type="submit">Sign Up</v-btn>
								</v-col>
								<v-col xs="12" sm="6">
									<v-btn block variant="tonal" @click="reset">Reset Form</v-btn>
								</v-col>
							</v-row>

							<v-row justify="space-between" class="text-center text-overline my-5">
								<v-col xs="12">
									Already have an account? <a @click="login">Log in</a>
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
	name: 'SignUp',
	components: { PageLayout },
	data: () => ({
		// show: false,
		valid: true,
		usernameExists: false,
		emailExists: false,
		signUpFailed: false,
		firstName: '',
		lastName: '',
		username: '',
		defaultRules: [
			(v: string) => !!v || 'Required',
			(v: string) => (v && v.length <= 50) || 'Must be less than 50 characters',
		],
		email: '',
		emailRules: [
			(v: string) => !!v || 'E-mail is required',
			(v: string) => /.+@.+\..+/.test(v) || 'Must be a valid email address',
		],
		// password: '',
		// passwordRules: [
		// 	(v: string) => !!v || 'Password is required',
		// 	(v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters',
		// ],
		// passwordConfirm: '',
		// passwordConfirmRules: [
		// 	(v: string) => (v && v == this.password) || 'Passwords must match',
		// ]
		loading: false,
	}),
	methods: {
		validate() {
			this.form.validate()
		},
		reset() {
			this.form.reset()
		},
		async checkUsernameExists() {
			const existingUser = await MediaProvider.getUser(this.username, undefined)
			this.usernameExists = !!existingUser
		},
		async checkEmailExists() {
			const existingUser = await MediaProvider.getUser(undefined, this.email)
			this.emailExists = !!existingUser
		},
		clearSignupFailed() {
			this.signUpFailed = false
		},
		async trySignup() {

			this.loading = true

			// // test loading
			// function timeout(ms: any) {
			// 	return new Promise(resolve => setTimeout(resolve, ms));
			// }
			// await timeout(5000)

			const request = {
				username: this.username,
				email: this.email,
				firstName: this.firstName,
				lastName: this.lastName
			}

			const user = await MediaProvider.addUser(request)

			if (!!user && user.username) {
				this.mainStore.login(user)
				this.$router.push({ path: '/collection' })
			} else {
				this.signUpFailed = true
			}

			this.loading = false

		},
		login() {
			this.$router.push({ path: '/login' })
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
			return this.valid && !this.errorMessage
		},
		errorMessage(): string {
			return (this.signUpFailed)
				? 'Signup failed'
				: (this.usernameExists && this.emailExists)
					? 'Username and email already exist'
					: (this.usernameExists)
						? 'Username already exists'
						: (this.emailExists)
							? 'Email already exists'
							: ''
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