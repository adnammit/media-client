import { acceptHMRUpdate, defineStore } from 'pinia'
import type IUser from '@/models/user'
import { useCollectionStore } from '@/store/collection'

type ErrorState = {
	isError: boolean,
	message: string
}

export type RootState = {
	user: IUser | null,
	isLoading: boolean,
	error: ErrorState,
}

export const useMainStore = defineStore('main', {

	state: () => ({
		user: null,
		isLoading: false,
		error: { isError: false, message: '' },
	} as RootState),

	actions: {

		setIsLoading(val: boolean) {
			this.isLoading = val
		},

		setIsErrored(val: boolean, message?: string) {
			this.error = { isError: val, message: message ?? '' }
		},

		login(user: IUser) {
			this.error = { isError: false, message: '' }
			this.user = user

			const collection = useCollectionStore()
			collection.loadCollection()
		},

		logout() {
			this.user = null
			this.$router.push({ path: '/' })

			const collection = useCollectionStore()
			collection.unloadCollection()
		},

	},
	getters: {
		userId: (state: RootState): number => state.user?.id ?? -1,
		username: (state: RootState): string => state.user?.username ?? '',
		fullName: (state: RootState): string => `${state.user?.firstName} ${state.user?.lastName}` ?? '',
		email: (state: RootState): string => state.user?.email ?? '',
		isAuthenticated: (state: RootState): boolean => (!!state.user?.username),
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}