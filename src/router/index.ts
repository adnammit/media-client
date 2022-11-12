import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Settings from '@/views/Settings.vue'
import Collection from '@/views/Collection.vue'
import Profile from '@/views/Profile.vue'
import ProfileForm from '@/components/forms/ProfileForm.vue'
import NotFound from '@/views/NotFound.vue'
import { useMainStore } from '@/store'

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
			path: '/signup',
			name: 'signup',
			component: SignUp
		},
		{
			path: '/collection',
			name: 'collection',
			component: Collection,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/profile",
			name: "profile",
			component: Profile,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/profileForm',
			name: 'profileForm',
			component: ProfileForm,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings,
			meta: {
				requiresAuth: true
			}
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

router.beforeEach(async (to) => {
	const authRequired = to.matched.some(record => record.meta.requiresAuth)
	const store = useMainStore();
	if (authRequired && !store.user?.username) {
		return { name: 'login' };
	}
});


export default router
