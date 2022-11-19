<template>
	<PageLayout>
		<v-card class="my-5 pa-5" :width="width">
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
								<v-col cols="12" >
									<v-btn block flat color="secondary" :loading="loading" :disabled="!canSubmit"
										class="text-color--contrast" @click="validate" type="submit">Log In</v-btn>
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

<script setup lang="ts">
import { computed, ref } from 'vue'
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

const username = ref('')
const email = ref('')
const errorMessage = ref('')

// FORM STUFF
const validate = () => {
	form.value?.validate()
}

const clearError = () => {
	errorMessage.value = ''
}

const canSubmit = computed(() => {
	return valid.value && errorMessage.value == ''
})

const width = computed(() => {
	return name.value == 'xs' ? '95vw' : '500px'
})

// FORM ACTIONS
const tryLogin = async () => {

	loading.value = true

	// // test loading
	// function timeout(ms: any) {
	// 	return new Promise(resolve => setTimeout(resolve, ms));
	// }
	// await timeout(5000)

	const user = await MediaProvider.getUser(username.value, email.value)

	if (!!user && user.username) {
		store.login(user)
		router.push({ path: '/collection' })
	} else {
		errorMessage.value = 'Login failed'
	}

	loading.value = false
}

const signup = () => {
	router.push({ path: '/signup' })
}

const demo = async () => {
	loading.value = true

	const user = await MediaProvider.getUser('test', 'test@test.com')

	if (!!user && user.username) {
		store.login(user)
		router.push({ path: '/collection' })
	} else {
		errorMessage.value = 'Demo login failed'
	}

	loading.value = false
}

</script>