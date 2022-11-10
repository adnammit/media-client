import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import Settings from '@/views/Settings.vue'
import Feed from '@/views/Feed.vue'
import Profile from '@/views/Profile.vue'
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
			path: '/feed',
			name: 'feed',
			component: Feed,
		},
		{
			path: "/profile",
			name: "profile",
			component: Profile,
			beforeEnter: authGuard,
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings,
			beforeEnter: authGuard,
		},
		{
			path: "/admin",
			name: "admin",
			component: Admin,
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
