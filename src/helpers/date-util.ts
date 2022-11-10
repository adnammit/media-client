// import moment from 'moment';

// export class DateUtil {
// 	public getIsoFormat(value?: any): string {
// 		var date = new Date(value);
// 		return date.toISOString().substring(0, 10);
// 	}

// 	public getDisplayFormat(value: any): string {
// 		if (value) {
// 			var date = moment(String(value));
// 			if (date.isValid()) return date.format('MM/DD/YYYY');
// 		}
// 		return '';
// 	}

// 	public parseDate(value: string): Date {
// 		return new Date(moment(value).format());
// 	}

// 	public isValidDate(d: Date): boolean {
// 		return d instanceof Date && !isNaN(d.getTime());
// 	}

// 	public getToday(): Date {
// 		return moment().toDate();
// 	}

// 	public getWeekStart(): Date {
// 		return moment(moment(this.getToday()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
// 			.subtract(1, 'weeks')
// 			.toDate();
// 	}

// 	public getMonthStart(): Date {
// 		return moment(moment(this.getToday()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
// 			.startOf('month')
// 			.toDate();
// 	}
// }

// export default new DateUtil();
