import { defineStore } from 'pinia'
import type IUser from '@/models/user'
import type { FeedItem } from '@/models/feedItem';
import MediaProvider from '@/services/MediaProvider';
import feedData from '@/store/feed.json'

type ErrorState = {
	isError: boolean,
	message: string
}

export type RootState = {
	user: IUser | null,
	error: ErrorState,
	filterSubject: string,
	feed: FeedItem[]
}

export const useMainStore = defineStore('main', {
	state: () => ({
		user: null,
		error: { isError: false, message: '' },
		filterSubject: '',
		feed: []
	} as RootState),

	actions: {

		async login(payload: IUser) {

			this.error = { isError: false, message: '' }

			// // we may want to just correlate auth0 user with our user by email alone, or only use email as unique identifier
			// let user = await MediaProvider.getUser(payload.nickname, payload.email)

			// if (!user) {

			// 	const req = {
			// 		email: payload.email,
			// 		username: payload.nickname,
			// 		imgUrl: payload.picture
			// 	} as IUser

			// 	const res = await MediaProvider.addUser(req)

			// 	if (!res) {

			// 		this.error = 'Failed creating user'

			// 	} else {
			// 		//// add more functionality for the case we just added a user
			// 		// set newUser flag and prompt them to do stuff?
			// 		user = res
			// 	}
			// }

			this.user = payload //user
		},

		async logout() {
			this.user = null
		},

		// async syncUser(user: AuthUser, isAuthenticated: boolean) {

		// 	// the user has logged out -- log out and you're done
		// 	if (!isAuthenticated && this.isAuthenticated) {
		// 		// TODO: somehow this isn't getting called -- this.user is already cleared out...
		// 		this.logout()
		// 	}

		// 	// the user has logged in or the user changed...?
		// 	else if ((isAuthenticated && !this.isAuthenticated && !!user?.email) || (user?.email ?? '' != this.email)) {
		// 		this.login(user)
		// 	}

		// },

		changeSubject(subject: string): boolean {
			this.filterSubject = subject
			return true
		},

		loadFeed() {
			this.feed = feedData.map((d: any) => {
				return {
					id: d.id as number,
					subject: d.subject,
					title: d.title,
					author: d.author,
					text: d.text,
					publishDate: d.publishDate,
					imgUrl: d.imgUrl
				} as FeedItem
			})
		},
	},

	getters: {
		username: (state: RootState): string => state.user?.username ?? '',
		fullName: (state: RootState): string => `${state.user?.firstName} ${state.user?.lastName}` ?? '',
		email: (state: RootState): string => state.user?.email ?? '',
		isAuthenticated: (state: RootState): boolean => (!!state.user?.username),
	}
})

