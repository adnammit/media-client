export class MathUtil {
	public Divide(numerator?: any, denominator?: any): number {
		let num = this.AsNumber(numerator);
		let den = +denominator;
		if (den) {
			// catches +/-0, NaN
			return num / den;
		}
		return NaN;
	}

	public AsNumber(value?: any): number {
		return isNaN(+value) ? 0 : +value;
	}

	public AsPositiveNumber(value?: any): number {
		let num = isNaN(+value) ? 0 : +value;
		return num < 0 ? 0 : num;
	}

	public RoundToPlace(val: any, place: number) {
		return +(+val).toFixed(place);
	}
}

export default new MathUtil();
