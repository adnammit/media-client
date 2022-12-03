export enum MediaType {
	Unknown = 'unknown',
	Movie = 'movie',
	TV = 'tv'
}

// ["all4", "apple", "britbox", "crave", "curiosity", "disney", "hbo", "hotstar", "hulu", "iplayer", "mubi", "netflix", "now", "paramount", "peacock", "prime", "showtime", "stan", "starz", "zee5"]
export enum StreamingProviderType {
	Unknown = 'unknown',
	AppleTv = 'apple',
	AmazonPrime = 'prime',
	Disney = 'disney',
	HBO = 'hbo',
	Hulu = 'hulu',
	Netflix = 'netflix',
	Paramount = 'paramount',
	Peacock = 'peacock',
	Showtime = 'showtime',
	Starz = 'starz',
}

export enum SortCriteria {
	None = 'None',
	Title = 'Title',
	Year = 'Year',
	Favorite = 'Favorite',
	Watched = 'Watched',
	UpNext = 'UpNext',
	UserRating = 'UserRating',
	PopularRating = 'PopularRating',
}

export enum SortDirection {
	Ascending = 'Ascending',
	Descending = 'Descending',
}