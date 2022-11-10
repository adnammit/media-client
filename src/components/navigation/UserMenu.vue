<template>
	<template v-if="isAuthenticated">
		<v-btn to="/collection" variant="text">
			Collection
		</v-btn>
		<v-menu open-on-hover :open-delay="0" location="bottom" transition="slide-x-transition">
			<template v-slot:activator="{ props }">
				<v-avatar class="mr-10 ml-4" size="52" v-bind="props">
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
		<SignupButton />
		<LoginButton />
	</template>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
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
	computed: {
		isAuthenticated(): boolean { return this.mainStore.isAuthenticated },
		avatar(): string {
			const imgUrl = this.mainStore.user?.imgUrl as string
			return (ImgUtil.isValidImage(imgUrl)) ? imgUrl : vibrates
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
			this.logout({
				returnTo: window.location.origin,
			})
		}
	},
	setup() {
		const mainStore = useMainStore()
		const { logout } = useAuth0()
		return { mainStore, logout }
	}
})
</script>
