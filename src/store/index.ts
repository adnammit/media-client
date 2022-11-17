import { defineStore } from 'pinia'
import type IUser from '@/models/user'
import type Title from '@/models/title'
import MediaProvider from '@/services/MediaProvider'

type ErrorState = {
	isError: boolean,
	message: string
}

export type RootState = {
	user: IUser | null,
	isLoading: boolean,
	error: ErrorState,
	collection: Title[]
}

export const useMainStore = defineStore('main', {

	state: () => ({
		user: null,
		isLoading: false,
		error: { isError: false, message: '' },
		collection: []
	} as RootState),

	actions: {

		async login(user: IUser) {
			this.error = { isError: false, message: '' }
			this.user = user
			this.loadCollection()
		},

		async logout() {
			this.user = null
			this.unloadCollection()
			this.$router.push({ path: '/' })
		},

		async loadCollection() {
			this.isLoading = true

			// // test loading
			// function timeout(ms: any) {
			// 	return new Promise(resolve => setTimeout(resolve, ms));
			// }
			// await timeout(5000)

			// // test search
			// await MovieDbApi.search('batman')


			MediaProvider.getUserTitles(this.user?.id ?? 0)
				.then((res: Title[]) => {
					this.collection = res

					// console.log('>> got this data')
					// console.log(res);
				})
				.catch((e: any) => {
					console.error(e);
					this.error = { isError: true, message: 'Error fetching user collection' }
				})
				.finally(() => {
					this.isLoading = false
				});
		},

		unloadCollection() {
			this.collection = []
		},
	},

	getters: {
		username: (state: RootState): string => state.user?.username ?? '',
		fullName: (state: RootState): string => `${state.user?.firstName} ${state.user?.lastName}` ?? '',
		email: (state: RootState): string => state.user?.email ?? '',
		isAuthenticated: (state: RootState): boolean => (!!state.user?.username),
	}
})

