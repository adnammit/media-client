export interface IUser {
	email: string,
	username: string,
	firstName?: string,
	lastName?: string,
	imgUrl?: string,
}

export default class User implements IUser {
	email: string
	username: string
	firstName?: string
	lastName?: string
	imgUrl?: string

	constructor(user: IUser) {
		this.email = user.email
		this.username = user.username
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.imgUrl = user.imgUrl
	}
}