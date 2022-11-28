import { formatYear } from '@/helpers/format'
import type { GenreItem } from '@/helpers/genre'
import { MediaType, SortCriteria, SortDirection } from '@/models/enum'
import type Title from '@/models/title'

export default class FilterCriteria {
	public globalSearch = ''
	public filterByFavorite = false
	public filterByWatched = false
	public filterByUpNext = false
	// TODO replace these two with enum
	public filterToMovies = false
	public filterToTv = false
	public filterGenre: GenreItem | undefined = undefined
	public direction = SortDirection.Ascending
	public criteria = SortCriteria.None

	public SortAndFilterTitles(list: Title[]) {

		let filtered: Title[] = []

		if (!!this.globalSearch) {
			filtered = this.doGlobalSearch(list, this.globalSearch)
		}
		else {

			// TODO: optimize this better
			if (this.isAnyFilter()) {
				filtered = list
					.filter(m => (this.filterByFavorite ? m.favorite : this.filterByWatched ? !m.watched : this.filterByUpNext ? m.queued : true))
					.filter(i => (this.filterToMovies ? i.mediaType == MediaType.Movie : this.filterToTv ? i.mediaType == MediaType.TV : true))
					.filter(g => g.genres.some(gg => this.filterGenre?.genres.includes(gg.name)))
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
				case SortCriteria.UserRating:
					filtered.sort(this.sortByUserRating)
					break
				case SortCriteria.PopularRating:
					filtered.sort(this.sortByPopularRating)
					break
			}
		}

		return filtered
	}

	private doGlobalSearch(list: Title[], search: string): Title[] {
		return list.filter(x => Object.values(x)
			.join(' ')
			.toLowerCase()
			.includes(search.toLowerCase()))
	}

	private isAnyFilter(): boolean {
		return this.filterByFavorite || this.filterByWatched || this.filterByUpNext || this.filterToMovies || this.filterToTv || !!this.filterGenre
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

	private sortByUserRating = (a: Title, b: Title): number => {
		const ratingA = a.rating
		const ratingB = b.rating

		const comparison = (ratingA > ratingB) ? 1
			: (ratingA < ratingB) ? -1
				: 0

		return comparison * this.getDirectionModifier()
	}

	private sortByPopularRating = (a: Title, b: Title): number => {
		const ratingA = a.popularRating ?? 0
		const ratingB = b.popularRating ?? 0

		const comparison = (ratingA > ratingB) ? 1
			: (ratingA < ratingB) ? -1
				: 0

		return comparison * this.getDirectionModifier()
	}

	// TODO: more sort
}
