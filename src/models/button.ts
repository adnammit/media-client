import type { ComputedRef } from 'vue'

export interface Button {
	text: string,
	onClick: () => void,
	isDisabled: () => boolean,
	prependIcon: undefined | string
}