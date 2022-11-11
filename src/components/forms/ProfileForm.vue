<template>
	<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="confirm">

		<!-- show login vs sign up -->

		<v-container>
			<v-row justify="center">
				<v-col xs="12" md="6">

					<div class="px-1 py-7">
						Sign up to join our cow-munity!
					</div>

					<v-text-field v-model="firstName" :counter="50" :rules="defaultRules" label="First Name" required variant="outlined">
					</v-text-field>

					<v-text-field v-model="lastName" :counter="50" :rules="defaultRules" label="Last Name" required variant="outlined">
					</v-text-field>

					<v-text-field v-model="username" :counter="50" :rules="defaultRules" label="Username" required variant="outlined">
					</v-text-field>

					<v-text-field v-model="email" :rules="emailRules" label="E-mail" required variant="outlined"></v-text-field>

					<!-- <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
						:type="show ? 'text' : 'password'" name="input-10-1" label="Normal with hint text" hint="At least 8 characters"
						counter @click:append="show = !show"></v-text-field> -->

					<v-row justify="space-around">
						<v-col>
							<v-btn flat color="secondary" :disabled="!valid" class="mr-4 color--bold" @click="validate"
								type="submit">Sign Up</v-btn>
							<v-btn variant="tonal" class="mr-4" @click="reset">Reset Form</v-btn>
						</v-col>
					</v-row>
				</v-col>

			</v-row>
		</v-container>

	</v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'

export default defineComponent({
	name: 'ProfileForm',
	data: () => ({
		valid: true,
		show: false,
		firstName: '',
		lastName: '',
		username: '',
		defaultRules: [
			(v: string) => !!v || 'Required',
			(v: string) => (v && v.length <= 50) || 'Name must be less than 10 characters',
		],
		email: '',
		emailRules: [
			(v: string) => !!v || 'E-mail is required',
			(v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
		confirm() {
			this.mainStore.login({
				email: this.email,
				username: this.username,
				fullName: `${this.firstName} ${this.lastName}`,
				password: ''
			})
			this.$router.push({ path: `/@${this.username}` })
		}
	},
	computed: {
		// username(): string {
		// 	return this.mainStore.username;
		// },
		// fullName(): string {
		// 	return this.mainStore.fullName;
		// },
		form(): any {
			return this.$refs.form as InstanceType<typeof FormData>;
		}
	},
	setup() {
		const mainStore = useMainStore()
		return { mainStore }
	}
})
</script>