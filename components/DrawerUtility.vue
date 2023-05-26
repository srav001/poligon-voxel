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
				width: 540
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
				<header class="drawer-header">
					<slot name="heading" />
					<h1 style="cursor: pointer" @click="$emit('close')">x</h1>
				</header>
				<hr />
				<slot />
				<hr />
				<slot name="footer" />
			</div>
		</Drawer>
	</ClientOnly>
</template>

<style lang="scss">
.drawer-header {
	display: flex;
	justify-content: space-between;
	align-items: center;

	h1 {
		margin: 0;
		cursor: pointer;
	}

	h2 {
		margin: 0;
	}
}

hr {
	border: 1px solid rgba(26, 26, 26, 0.1);
	margin: 1.5rem 0;
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
