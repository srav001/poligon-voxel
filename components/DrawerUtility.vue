<script>
export default {
	name: 'DrawerUtility',
	components: {
		Drawer: () => (process.client ? import('vue-simple-drawer') : null)
	},
	props: {
		showDrawer: {
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
		<Drawer align="right" :closeable="false" @close="$emit('close')">
			<div v-if="showDrawer" id="slider" :style="'width:' + sliderWidth + 'px'">
				<header class="slider-header">
					<h4>Heading</h4>
					<h1 @click="$emit('close')">X</h1>
				</header>
				<slot />
				<hr />
			</div>
		</Drawer>
	</ClientOnly>
</template>

<style lang="scss">
.slider-header {
	display: flex;
	justify-content: space-between;
	align-items: center;

	h1 {
		cursor: pointer;
	}
}

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
