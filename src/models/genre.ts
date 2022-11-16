export default class Genre {
	public id = 0;
	public name = '';

	constructor(dto: any) {
		this.id = dto.id;
		this.name = dto.name;
	}
}
