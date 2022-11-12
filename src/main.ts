import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { loadFonts } from './plugins/webfontloader'
import vuetify from '@/plugins/vuetify'
import { formatYear } from '@/filters/format'
import '@/assets/main.scss'

loadFonts()

const app = createApp(App)

app.use(createPinia())
	.use(vuetify)
	.use(router)
	.mount('#app')

app.config.globalProperties.$filters = {
	formatYear
}
