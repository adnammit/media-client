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

<script setup lang="ts">
import { useMainStore } from '@/store'
import LoginButton from '@/components/buttons/LoginButton.vue'
import SignupButton from '@/components/buttons/SignupButton.vue'
import vibrates from '@/assets/vibrates.png'
import ImgUtil from '@/helpers/img-util'
import { computed } from 'vue'

const store = useMainStore()

defineProps({
	classes: String,
})

const avatar = computed(() => {
	const imgUrl = store.user?.imgUrl as string
	return (ImgUtil.isValidImage(imgUrl)) ? imgUrl : vibrates
})

const isAuthenticated = computed(() => {
	return store.isAuthenticated
})

const handleLogout = () => {
	store.logout()
}

const profileItems = [
	{ text: 'Profile', icon: 'mdi-account-cowboy-hat', route: '/profile', click: null },
	{ text: 'Settings', icon: 'mdi-cog', route: '/settings', click: null },
	{ text: 'Logout', icon: 'mdi-exit-run', route: '', click: handleLogout },
]

</script>
