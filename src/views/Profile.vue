<template>
	<PageLayout>
		<v-card variant="tonal" class="pa-6">
			<div class="d-flex flex-no-wrap justify-space-between">
				<div>
					<v-container>
						<v-row align="center" justify="center">
							<v-col align="right" xs="12" md="6">
								<v-card-title>
									{{ fullName }}
								</v-card-title>
								<v-card-subtitle>
									{{ email }}
								</v-card-subtitle>

							</v-col>
							<v-col align="left" xs="12" md="6">
								<v-avatar class="ma-6" size="100">
									<v-img alt="Avatar" :src="avatar"></v-img>
								</v-avatar>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col xs="12">
								<v-card-text>
									<div class="text--primary">
										<p>
											One day this will contain useful information about the user's profile and
											allow
											them to manage their info. For now it is just a little fun with <a
												href="https://www.bobrosslipsum.com/">Bob
												Ross.</a>
											<br><br>
											Let's have a little bit of fun today. The only thing worse than yellow snow
											is
											green snow.
											It's hard to see things when you're too close. Take a step back and look.
											Take
											your time. Speed will come later. Paint anything you want on the canvas.
											Create
											your own world.
											<br><br>
											Let's put some happy trees and bushes back in here. That easy. Happy
											painting, God bless. All those little son of a guns. Even the worst thing we
											can do here is good.
										</p>
									</div>
								</v-card-text>
							</v-col>
						</v-row>
						<!-- <v-row justify="center">
						<v-col xs="12">
							<v-card-actions>
								<v-btn>Click me</v-btn>
							</v-card-actions>
						</v-col>
					</v-row> -->

					</v-container>

				</div>

			</div>
		</v-card>
	</PageLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import PageLayout from '@/components/navigation/PageLayout.vue'
import vibrates from '@/assets/vibrates.png'
import ImgUtil from '@/helpers/img-util'

export default defineComponent({
	name: 'Profile',
	components: { PageLayout },
	computed: {
		username(): string { return this.mainStore.username },
		fullName(): string { return this.mainStore.fullName },
		email(): string { return this.mainStore.email },
		avatar(): string {
			const imgUrl = this.mainStore.user?.imgUrl as string
			return (ImgUtil.isValidImage(imgUrl)) ? imgUrl : vibrates
		}
	},
	data() {
		return {
			vibrates: vibrates
		}
	},
	setup() {
		const mainStore = useMainStore()
		return { mainStore }
	}
})
</script>