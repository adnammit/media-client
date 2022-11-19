<template>
	<PageLayout>
		<v-card class="my-5 pa-5" :width="width">
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

							<v-text-field v-model="username" :counter="50" :rules="rules.defaultRules" label="Username"
								required clearable variant="outlined" @blur="checkUsernameExists"
								@focus="clearSignupFailed">
							</v-text-field>

							<v-text-field v-model="email" :rules="rules.emailRules" label="E-mail" required clearable
								variant="outlined" @blur="checkEmailExists" @focus="clearSignupFailed">
							</v-text-field>

							<v-text-field v-model="firstName" :counter="50" :rules="rules.defaultRules"
								label="First Name" required clearable variant="outlined">
							</v-text-field>

							<v-text-field v-model="lastName" :counter="50" :rules="rules.defaultRules" label="Last Name"
								required clearable variant="outlined">
							</v-text-field>

							<!-- <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
						:type="show ? 'text' : 'password'" name="input-10-1" label="Normal with hint text" hint="At least 8 characters"
						counter @click:append="show = !show"></v-text-field> -->

							<v-row justify="space-between" class="my-5">
								<v-col cols="12" sm="6">
									<v-btn block flat color="secondary" :loading="loading" :disabled="!canSubmit"
										class="text-color--contrast" @click="validate" type="submit">Sign Up</v-btn>
								</v-col>
								<v-col cols="12" sm="6">
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useMainStore } from '@/store'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/navigation/PageLayout.vue'
import MediaProvider from '@/services/MediaProvider';


const store = useMainStore()
const { name } = useDisplay()
const router = useRouter()

const form = ref<any>(null) // TODO: why you no type??
// const form = ref<InstanceType<typeof FormData>>(null)

const valid = ref(true)
const loading = ref(false)

const usernameExists = ref(false)
const emailExists = ref(false)
const signUpFailed = ref(false)
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')

const rules = {
	defaultRules: [
		(v: string) => !!v || 'Required',
		(v: string) => (v && v.length <= 50) || 'Must be less than 50 characters',
	],
	emailRules: [
		(v: string) => !!v || 'E-mail is required',
		(v: string) => /.+@.+\..+/.test(v) || 'Must be a valid email address',
	]
}
// password: '',
// passwordRules: [
// 	(v: string) => !!v || 'Password is required',
// 	(v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters',
// ],
// passwordConfirm: '',
// passwordConfirmRules: [
// 	(v: string) => (v && v == this.password) || 'Passwords must match',
// ]

// FORM STUFF
const validate = () => {
	form.value?.validate()
}

const reset = () => {
	form.value.reset()
}

const checkUsernameExists = async () => {
	const existingUser = await MediaProvider.getUser(username.value, undefined)
	usernameExists.value = !!existingUser
}

const checkEmailExists = async () => {
	const existingUser = await MediaProvider.getUser(undefined, email.value)
	emailExists.value = !!existingUser
}

const clearSignupFailed = () => {
	signUpFailed.value = false
}

const errorMessage = computed(() => {
	return signUpFailed.value
		? 'Signup failed'
		: usernameExists.value && emailExists.value
			? 'Username and email already exist'
			: usernameExists.value
				? 'Username already exists'
				: (emailExists.value)
					? 'Email already exists'
					: ''
})

const canSubmit = computed(() => {
	return valid.value && errorMessage.value == ''
})

const width = computed(() => {
	return name.value == 'xs' ? '95vw' : '500px'
})

// FORM ACTIONS
const trySignup = async () => {

	loading.value = true

	// // test loading
	// function timeout(ms: any) {
	// 	return new Promise(resolve => setTimeout(resolve, ms));
	// }
	// await timeout(5000)

	const request = {
		username: username.value,
		email: email.value,
		firstName: firstName.value,
		lastName: lastName.value,
	}

	const user = await MediaProvider.addUser(request)

	if (!!user && user.username) {
		store.login(user)
		router.push({ path: '/collection' })
	} else {
		signUpFailed.value = true
	}

	loading.value = false
}

const login = () => {
	router.push({ path: '/login' })
}

const demo = async () => {
	loading.value = true

	const user = await MediaProvider.getUser('test', 'test@test.com')

	if (!!user && user.username) {
		store.login(user)
		router.push({ path: '/collection' })
	} else {
		signUpFailed.value = true
	}

	loading.value = false
}

</script>