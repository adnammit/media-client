<template>
	<PageLayout>
		<v-card class="pa-6" max-width="80%">
			<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="confirm">

				<!-- show login vs sign up -->

				<v-container fluid>
					<v-row justify="center">
						<v-col cols="12">

							<div class="my-5 text-h5">
								Sign up to start tracking your watch list!
							</div>

							<v-alert :style="{ visibility: errorMessage ? 'visible' : 'hidden' }" type="error"
								class="my-5" density="compact">
								{{ errorMessage }}
							</v-alert>

							<v-text-field v-model="username" :counter="50" :rules="defaultRules" label="Username"
								required variant="outlined" @focus="clearError" @blur="checkUsernameExists">
							</v-text-field>

							<v-text-field v-model="email" :rules="emailRules" label="E-mail" required
								variant="outlined">
							</v-text-field>

							<v-text-field v-model="firstName" :counter="50" :rules="defaultRules" label="First Name"
								required variant="outlined">
							</v-text-field>

							<v-text-field v-model="lastName" :counter="50" :rules="defaultRules" label="Last Name"
								required variant="outlined">
							</v-text-field>

							<!-- <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
						:type="show ? 'text' : 'password'" name="input-10-1" label="Normal with hint text" hint="At least 8 characters"
						counter @click:append="show = !show"></v-text-field> -->

							<v-row justify="space-between">
								<v-col xs="12" sm="6">
									<v-btn block flat color="secondary" :disabled="!canSubmit" class="color--bold"
										@click="validate" type="submit">Sign Up</v-btn>
								</v-col>
								<v-col xs="12" sm="6">
									<v-btn block variant="tonal" @click="reset">Reset Form</v-btn>
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

export default defineComponent({
	name: 'Settings',
	components: { PageLayout },
	data: () => ({
		valid: true,
		show: false,
		errorMessage: '', // IMPLEMENT
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
		checkUsernameExists() {
			// call to load user
			this.errorMessage = 'User already exists'
		},
		confirm() {

			// CHECK IF USER EXISTS AND THEN:
			// const userExists = true

			// if (userExists) {
			// 	this.errorMessage = 'User already exists'
			// } else {
			if (!this.errorMessage) {
				this.mainStore.login({
					email: this.email,
					username: this.username,
					firstName: this.firstName,
					lastName: this.lastName
				})
				this.$router.push({ path: '/profile' })
				// this.$router.push({ path: `/@${this.username}` })
			}
		}
	},
	computed: {
		form(): any {
			return this.$refs.form as InstanceType<typeof FormData>;
		},
		canSubmit(): boolean {
			return this.valid && !this.errorMessage
		}
	},
	setup() {
		const mainStore = useMainStore()
		return { mainStore }
	}
})
</script>