export interface Button {
	text: string | (() => string),
	onClick: () => void,
	isDisabled: () => boolean,
	prependIcon: undefined | string
}