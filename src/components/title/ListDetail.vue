<template>
	<v-row justify="center">
		<v-dialog v-model="value" scrollable class="modal-contents" :class="dialogClasses"
			:fullscreen="isVerySmallScreen" :max-width="maxWidth">
			<v-card>
				<v-card-text class="pa-0">
					<v-container class="pa-3">
						<v-row>
							<v-col cols="12" class="align-self-center pa-3">
								<!-- TODO add char limits here -->
								<v-row>
									<v-col align-self="center" class="text-h4 pt-8">
										<v-text-field v-model="listName" label="List Name" variant="outlined">
										</v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col align-self="center">
										<v-textarea label="Description" variant="outlined" v-model="description"></v-textarea>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>

				<v-card-actions>

					<v-spacer></v-spacer>

					<v-btn v-if="isDeleteEnabled" @click="confirmDelete" :size="buttonSize" color="error" variant="flat"
						:disabled="isLoading">
						Delete
					</v-btn>

					<v-btn @click="closeDialog" :size="buttonSize" :disabled="isLoading">Cancel</v-btn>

					<v-btn @click.prevent="save()" :size="buttonSize" color="secondary" type="submit" variant="flat"
						:disabled="isLoading" :loading="isLoading">Save</v-btn>

				</v-card-actions>
			</v-card>
		</v-dialog>

		<SimpleAlert v-model="alert" :titleText="alertTitle" :messageText="alertMessage" :cancelText="cancelText"
			@confirm-alert="closeAlertWithConfirm()" @cancel-alert="closeAlert()" />
	</v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch, type PropType } from 'vue'
import { useDisplay } from 'vuetify'
import { useMainStore } from '@/store/'
import type MediaList from '@/models/mediaList'
import type UserListData from '@/models/dto/userListData'
import SimpleAlert from '@/components/SimpleAlert.vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	list: {
		type: Object as PropType<MediaList>,
		required: true
	},
	isDeleteEnabled: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update:modelValue', 'save', 'delete'])
// const emit = defineEmits(['update:modelValue', 'save', 'clearData'])

const value = computed({
	get() {
		return props.modelValue
	},
	set(val: Boolean) {
		emit('update:modelValue', val)
	}
})

const store = useMainStore()
const { name } = useDisplay()

const listName = ref('')
const description = ref('')

const isLoading = computed(() => {
	return store.isLoading
})

// ALERT MODAL
const alert = ref(false)
const alertTitle = `Confirm`
const cancelText = `Nevermind`

const alertMessage = computed(() => {
	return `Are you sure you want to delete your list "${props.list.name}"? All titles on the list will stay in your collection and any other lists they're in`
})

// DIALOG MANAGEMENT
const isSmallScreen = computed(() => {
	return ['xs', 'sm'].includes(name.value)
})

const isVerySmallScreen = computed(() => {
	return name.value == 'xs'
})

const maxWidth = computed(() => {
	return isSmallScreen.value ? '' : '800'
})

const dialogClasses = computed(() => {
	return isSmallScreen.value ? 'pa-0 ma-0' : 'pa-10'
})

const buttonSize = computed(() => {
	return isVerySmallScreen.value ? 'small' : 'default'
})

const closeDialog = () => {
	emit('update:modelValue', false)
}

const confirmDelete = () => {
	alert.value = true
}

const closeAlert = () => {
	alert.value = false
}

const closeAlertWithConfirm = async () => {
	alert.value = false
	emit('delete', props.list.listId)
	closeDialog()
}

const save = async () => {

	const data = {
		name: listName.value,
		description: description.value,
	} as UserListData

	emit('save', data, props.list.listId)
	closeDialog()
}

const reset = () => {
	listName.value = props.list.name
	description.value = props.list.description ?? ''
}

watch(() => props.modelValue, (newValue) => {
	if (newValue) {
		reset()
	} else {
		// emit('clearData')
	}
})

</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/main';
@import '@/assets/modal';

.poster-overlay__bottom {
	position: absolute;
	bottom: 0;
}
</style>
