<script setup lang="ts">
import itemStore from '@/helper/itemsStore';
import bagSvg from '~/assets/bag.svg?inline';
</script>

<template>
	<nav class="px-common">
		<a>
			<span class="main-title"> Voxel </span>
			<span class="sub-title"> Store </span>
		</a>
		<span class="cart-icon" @click="$emit('open-cart')">
			<bagSvg />
			{{ itemStore.state.items.length > 0 ? `(${itemStore.state.items.length})` : '' }}
		</span>
	</nav>
</template>

<style lang="scss" scoped>
nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 4rem;
}

.cart-icon {
	cursor: pointer;
	display: flex;
	align-items: center;
	height: 4rem;
}
</style>
