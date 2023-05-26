<script>
export default {
	name: 'DrawerUtility',
	components: {
		Drawer: () => (process.client ? import('vue-simple-drawer') : null)
	},
	props: {
		showSlider: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			dataOptions: {
				align: 'right',
				width: 500
			},
			sliderWidth: 500
		};
	},
	onBeforeMount() {
		window.addEventListener('resize', this.handleResize);
	},
	mounted() {
		this.handleResize();
	},
	methods: {
		closeSlider() {
			this.$emit('close');
		},
		handleResize() {
			if (window.innerWidth > this.dataOptions.width + 40) {
				this.sliderWidth = this.dataOptions.width;
			} else {
				this.sliderWidth = window.innerWidth - 40;
			}
		}
	}
};
</script>

<template>
	<ClientOnly>
		<Drawer align="right" @close="closeSlider">
			<div v-if="showSlider" id="slider" :style="'width:' + sliderWidth + 'px'">
				<slot name="slider-header">
					<h4>Heading</h4>
				</slot>
				<slot name="slider-body" />
				<hr />
				<slot name="slider-footer">
					<div>
						<button @click.prevent="closeSlider">Close</button>
					</div>
				</slot>
			</div>
		</Drawer>
	</ClientOnly>
</template>

<style>
.vue-simple-drawer {
	background-color: #fff !important;
	color: #333 !important;
	z-index: 1050 !important;
}
.vue-simple-drawer .close-btn div {
	width: 20px !important;
}
.mask {
	z-index: 1049 !important;
}
</style>
