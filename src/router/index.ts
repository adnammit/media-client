import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import Settings from '@/views/Settings.vue'
import Collection from '@/views/Collection.vue'
import Profile from '@/views/Profile.vue'
import ProfileForm from '@/components/forms/ProfileForm.vue'
import Callback from '@/views/Callback.vue'
import NotFound from '@/views/NotFound.vue'
import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/about",
			name: "about",
			component: About,
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/collection',
			name: 'collection',
			component: Collection,
			beforeEnter: authGuard,
		},
		{
			path: "/profile",
			name: "profile",
			component: Profile,
			beforeEnter: authGuard,
		},
		{
			path: '/profileForm',
			name: 'profileForm',
			component: ProfileForm,
			beforeEnter: authGuard,
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings,
			beforeEnter: authGuard,
		},
		{
			path: "/callback",
			name: "callback",
			component: Callback,
		},
		{
			path: "/:catchAll(.*)",
			name: "Not Found",
			component: NotFound,
		},
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/AboutView.vue')
		// },
	]
})

export default router
