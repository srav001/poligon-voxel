<script setup lang="ts">
import itemStore from '@/helper/itemsStore';
</script>

<template>
	<nav class="px-common">
		<a>
			<span class="main-title"> Voxel </span>
			<span class="sub-title"> Store </span>
		</a>
		<a class="cart-icon" @click="$emit('open-cart')">
			cart {{ itemStore.state.items.length > 0 ? `(${itemStore.state.items.length})` : '' }}
		</a>
	</nav>
</template>

<style lang="scss" scoped>
nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 4rem;
}

.sub-title {
	font-weight: 100;
	color: gray;
}
.main-title {
	font-weight: 500;
}

.cart-icon {
	cursor: pointer;
}
</style>
