import { createApp, markRaw } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { loadFonts } from '@/plugins/webfontloader'
import FontAwesomeIcon from '@/plugins/font-awesome'
import vuetify from '@/plugins/vuetify'
import '@/assets/main.scss'

loadFonts()

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
	store.$router = markRaw(router)
})

app.use(pinia)
	.use(vuetify)
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(router)
	.mount('#app')

// // this is what we're supposed to do now: https://v3-migration.vuejs.org/breaking-changes/filters.html
// // but it's not very convenient
// app.config.globalProperties.$filters = {
// 	formatYear
// }
