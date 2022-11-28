import moment from 'moment'

export const formatYear = (value?: Date) => {
	const date = moment(String(value))
	if (date.isValid()) {
		return date.year().toString()
	}
	return ''
}
