import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia';
import { loadFonts } from './plugins/webfontloader'
import vuetify from '@/plugins/vuetify'
import { createAuth0 } from '@auth0/auth0-vue';
import { formatYear } from '@/filters/format';
import '@/assets/main.scss'

loadFonts()

const app = createApp(App)

app.use(createPinia())
	.use(vuetify)
	.use(router)
	.use(createAuth0({
		domain: import.meta.env.VITE_AUTH0_DOMAIN,
		client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
		// redirect_uri: window.location.origin,
		redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
		audience: import.meta.env.VITE_AUTH0_AUDIENCE
	}))
	.mount('#app')

app.config.globalProperties.$filters = {
	formatYear
}
