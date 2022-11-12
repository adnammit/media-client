import { defineStore } from 'pinia'
import type IUser from '@/models/user'
import type { FeedItem } from '@/models/feedItem'
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

		async login(user: IUser) {
			this.error = { isError: false, message: '' }
			this.user = user
		},

		async logout() {
			this.user = null
			this.$router.push({ path: '/' })
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
		fullName: (state: RootState): string => `${state.user?.firstName} ${state.user?.lastName}` ?? '',
		email: (state: RootState): string => state.user?.email ?? '',
		isAuthenticated: (state: RootState): boolean => (!!state.user?.username),
	}
})

