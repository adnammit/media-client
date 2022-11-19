<template>
	<v-dialog v-model="value" max-width="600">
		<v-card fill>
			<v-form ref="form" class="modal-contents" @submit.prevent="submit">
				<v-card-title class="headline">{{ titleText }}</v-card-title>

				<v-card-text>
					{{ messageText }}
				</v-card-text>
				<v-card-actions class="modal-actions mt-12">
					<v-spacer></v-spacer>
					<v-btn @click.stop="cancel">{{ cancelText }}</v-btn>
					<v-btn class="primary" type="submit">{{ confirmText }}</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';

const props = defineProps({
	value: {
		type: Boolean,
		default: false
	},
	titleText: {
		type: String,
		default: 'Alert!'
	},
	messageText: {
		type: String,
		default: 'This is an Alert'
	},
	confirmText: {
		type: String,
		default: 'OK'
	},
	cancelText: {
		type: String,
		default: 'Cancel'
	},
})

const emit = defineEmits(['confirmDialog', 'cancelDialog'])


const submit = () => {
	emit('confirmDialog')
}

const cancel = () => {
	emit('cancelDialog')
}

onBeforeMount(() => {
	console.log('>> alerting!');
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
