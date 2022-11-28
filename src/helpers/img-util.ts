export class ImgUtil {

	public isValidImage(url?: any): boolean {

		if (typeof url !== 'string') return false
		return url != ''

		// ugh, cors -- fix this later maybe
		// var request = new XMLHttpRequest();
		// request.open("GET", url, true);
		// request.send();
		// console.log('>> status ' + JSON.stringify(request.statusText));
		// return (request.statusText == 'OK')
	}
}

export default new ImgUtil()