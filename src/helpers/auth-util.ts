export class SimpleJwt {
	public exp: number = 0;
	public iat: number = 0;
	public isValid: boolean = false;

	constructor(token?: string) {
		if (token) {
			this.parseExp(token);
		}
	}

	public duration(): number {
		return this.exp - this.iat;
	}

	private parseExp(token: string) {
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace('-', '+').replace('_', '/');
			const jwt = JSON.parse(window.atob(base64));
			this.exp = (jwt.exp as number) || 0;
			this.iat = (jwt.iat as number) || 0;
			this.isValid = true;
		} catch (error) {
			this.isValid = false;
			console.error('Error parsing token expiration'); // eslint-disable-line no-console
		}
	}
}
