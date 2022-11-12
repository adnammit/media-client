<template>
	<div>
		<template v-if="isAuthenticated">
			<v-btn to="/collection" variant="text" :class="classes">
				Collection
			</v-btn>
			<v-menu open-on-hover :open-delay="0" location="bottom" transition="slide-x-transition">
				<template v-slot:activator="{ props }">
					<v-avatar class="ml-2" size="52" v-bind="props">
						<v-img alt="Avatar" :src="avatar"></v-img>
					</v-avatar>
				</template>

				<v-list>
					<v-list-item v-for="(item, index) in profileItems" :key="index" :to="item.route" @click=item.click>
						<template v-slot:prepend>
							<!-- <v-icon :icon="item.icon"></v-icon> -->
						</template>
						<v-list-item-title>
							{{ item.text }}
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</template>
		<template v-else>
			<SignupButton :classes="classes" />
			<LoginButton :classes="classes" />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import LoginButton from '@/components/buttons/LoginButton.vue'
import SignupButton from '@/components/buttons/SignupButton.vue'
import vibrates from '@/assets/vibrates.png'
import ImgUtil from '@/filters/img-util'

export default defineComponent({
	name: 'UserMenu',
	components: {
		LoginButton,
		SignupButton
	},
	props: {
		classes: String,
	},
	computed: {
		isAuthenticated(): boolean { return this.mainStore.isAuthenticated },
		avatar(): string {
			const imgUrl = this.mainStore.user?.imgUrl as string
			return (ImgUtil.isValidImage(imgUrl)) ? imgUrl : vibrates
		},
		buttonClasses(): string | undefined {
			return this.classes
		}
	},
	data() {
		return {
			profileItems: [
				{ text: 'Profile', icon: 'mdi-account-cowboy-hat', route: '/profile', click: null },
				{ text: 'Settings', icon: 'mdi-cog', route: '/settings', click: null },
				{ text: 'Logout', icon: 'mdi-exit-run', route: '', click: this.handleLogout },
			],
			vibrates: vibrates
		}
	},
	methods: {
		handleLogout() {
			this.mainStore.logout()

			// this.logout({
			// 	returnTo: window.location.origin,
			// })
		}
	},
	setup() {
		const mainStore = useMainStore()
		return { mainStore }
	}
})
</script>
