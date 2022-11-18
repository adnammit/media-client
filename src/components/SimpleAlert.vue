<template>
	<v-dialog v-model="value" max-width="600">
		<v-card fill>
			<v-form ref="form" class="modal-contents" @submit.prevent="$emit('closeDialog', true)">
				<v-card-title class="headline">{{ titleText }}</v-card-title>

				<v-card-text>
					{{ messageText }}
				</v-card-text>
				<v-card-actions class="modal-actions mt-12">
					<v-spacer></v-spacer>
					<v-btn @click.stop="$emit('closeDialog', false)">{{ cancelText }}</v-btn>
					<v-btn class="primary" type="submit">{{ confirmText }}</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		value: Boolean,
		titleText: String,
		messageText: String,
		confirmText: String,
		cancelText: String,
	},
	computed: {
		// showDialog(): boolean {
		// 	return this.value ?? true
		},
	methods: {

		// onConfirm(): void {
		// 	this.onConfirm();
		// 	$emit('value', false)
		// 	// this.showDialog = false;
		// },

		// cancel() {
		// 	this.showDialog = false;
		// },
	},
	// setup (props, context) {
	// 	const handleChange = (event: any) => {
	// 		context.emit("customChange", event.target.value)
	// 	}
	// 	return {
	// 		handleChange
	// 	}
	// }
})
</script>



<!-- <script lang="ts">

@Component
export default class SimpleAlert extends Vue {
	@Prop(Boolean) readonly value!: boolean;
	@Prop({ default: 'Alert' }) readonly titleText!: string;
	@Prop({ default: '' }) readonly messageText!: string;
	@Prop({ default: 'Ok' }) readonly confirmText!: string;
	@Prop({ default: 'Cancel' }) readonly cancelText!: string;
	@Prop(Function) readonly onConfirm!: () => void;

	private get showDialog(): boolean {
		return this.value;
	}

	private set showDialog(value: boolean) {
		this.$emit('input', value);
	}

	private confirm() {
		this.onConfirm();
		this.showDialog = false;
	}

	private cancel() {
		this.showDialog = false;
	}
}
</script> -->

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/modal';
</style>
