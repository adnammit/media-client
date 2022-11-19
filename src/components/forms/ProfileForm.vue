<template>
	<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="save">

		<!-- show login vs sign up -->

		<v-container>
			<v-row justify="center">
				<v-col xs="12" md="6">

					<div class="px-1 py-7">
						Sign up to join our cow-munity!
					</div>

					<v-text-field v-model="firstName" :counter="50" :rules="rules.defaultRules" label="First Name" required
						variant="outlined">
					</v-text-field>

					<v-text-field v-model="lastName" :counter="50" :rules="rules.defaultRules" label="Last Name" required
						variant="outlined">
					</v-text-field>

					<v-text-field v-model="username" :counter="50" :rules="rules.defaultRules" label="Username" required
						variant="outlined">
					</v-text-field>

					<v-text-field v-model="email" :rules="rules.emailRules" label="E-mail" required variant="outlined">
					</v-text-field>

					<!-- <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
						:type="show ? 'text' : 'password'" name="input-10-1" label="Normal with hint text" hint="At least 8 characters"
						counter @click:append="show = !show"></v-text-field> -->

					<v-row justify="space-around">
						<v-col>
							<v-btn flat color="secondary" :disabled="!valid" class="mr-4 text-color--contrast"
								@click="validate" type="submit">Sign Up</v-btn>
							<v-btn variant="tonal" class="mr-4" @click="reset">Reset Form</v-btn>
						</v-col>
					</v-row>
				</v-col>

			</v-row>
		</v-container>

	</v-form>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue'

const valid = ref(true)

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')

const form = ref<any>(null) // TODO: why you no type??

const rules = {
	defaultRules: [
		(v: string) => !!v || 'Required',
		(v: string) => (v && v.length <= 50) || 'Name must be less than 10 characters',
	],
	emailRules: [
		(v: string) => !!v || 'E-mail is required',
		(v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
	],
}

// FORM STUFF
const validate = () => {
	form.value?.validate()
}

const reset = () => {
	form.value.reset()
}

const save = () => {
	// form.value.reset()
}

</script>