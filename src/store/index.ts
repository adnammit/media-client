import { defineStore } from 'pinia'
import type { User } from '@/models/user';
import type { User as AuthUser } from '@auth0/auth0-spa-js/dist/typings/global';
import type { FeedItem } from '@/models/feedItem';
import feedData from '@/store/feed.json'

export type RootState = {
	user: User | null,
	error: string, // do someting with error or lose it
	filterSubject: string,
	feed: FeedItem[]
}

export const useMainStore = defineStore('main', {
	state: () => ({
		user: null,
		error: '',
		filterSubject: '',
		feed: []
	} as RootState),

	actions: {
		async login(payload: AuthUser) {

			const user = {
				email: payload.email,
				username: payload.name,
				fullName: payload.nickname,
				imgUrl: payload.picture
			} as User

			this.user = user
			this.error = ''
		},
		async logout() {
			this.user = null
		},
		async syncUser(user: AuthUser, isAuthenticated: boolean) {

			// the user has logged out -- log out and you're done
			if (!isAuthenticated && this.isAuthenticated) {
				this.logout()
			}

			// the user has logged in or the user changed...?
			else if ((isAuthenticated && !this.isAuthenticated) || (user?.name != this?.username)) {
				this.login(user)
			}

		},
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
		fullName: (state: RootState): string => state.user?.fullName ?? '',
		email: (state: RootState): string => state.user?.email ?? '',
		isAuthenticated: (state: RootState): boolean => (!!state.user?.username),
	}
})

