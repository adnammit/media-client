import { formatYear } from '@/filters/format'
import { MediaType, SortCriteria, SortDirection } from '@/models/enum'
import type Title from '@/models/title'

export default class FilterCriteria {
	public filterByFavorite = false
	public filterByWatched = false
	public filterByUpNext = false
	// TODO replace these two with enum
	public filterToMovies = false
	public filterToTv = false
	public direction = SortDirection.Ascending
	public criteria = SortCriteria.None

	public SortAndFilterTitles(list: Title[]) {

		let filtered: Title[]

		if (this.isAnyFilter()) {
			filtered = list
				.filter(m => (this.filterByFavorite ? m.favorite : this.filterByWatched ? !m.watched : this.filterByUpNext ? m.queued : true))
				.filter(i => (this.filterToMovies ? i.mediaType == MediaType.Movie : this.filterToTv ? i.mediaType == MediaType.TV : true))
		} else {
			filtered = list.map(l => l)
		}

		switch (this.criteria) {
			case SortCriteria.Title:
				filtered.sort(this.sortByTitle)
				break
			case SortCriteria.Year:
				filtered.sort(this.sortByYear)
				break
			case SortCriteria.Rating:
				filtered.sort(this.sortByRating)
				break
		}

		return filtered
	}

	private isAnyFilter(): boolean {
		return this.filterByFavorite || this.filterByWatched || this.filterByUpNext || this.filterToMovies || this.filterToTv
	}

	private getDirectionModifier(): number {
		return this.direction == SortDirection.Ascending ? 1 : -1
	}

	private sortByTitle = (a: Title, b: Title): number => {

		const strA = a.title.toLocaleLowerCase()
		const strB = b.title.toLocaleLowerCase()

		const comparison = (strA > strB) ? 1
			: (strA < strB) ? -1
				: 0

		return comparison * this.getDirectionModifier()
	}

	private sortByYear = (a: Title, b: Title): number => {

		const yearA = formatYear(a.releaseDate)
		const yearB = formatYear(b.releaseDate)

		const comparison = (yearA > yearB) ? 1
			: (yearA < yearB) ? -1
				: 0

		return comparison * this.getDirectionModifier()
	}

	private sortByRating = (a: Title, b: Title): number => {
		const ratingA = a.rating
		const ratingB = b.rating

		const comparison = (ratingA > ratingB) ? 1
			: (ratingA < ratingB) ? -1
				: 0

		return comparison * this.getDirectionModifier()
	}

	// TODO: more sort
}
