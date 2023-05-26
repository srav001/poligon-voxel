<script setup lang="ts">
import { computed } from 'vue';
import itemsStore from '@/helper/itemsStore';

defineProps({
	show: {
		type: Boolean,
		required: false,
		default: false
	}
});
defineEmits<{
	(e: 'close', value: boolean): void;
}>();

const totalCost = computed(() =>
	itemsStore.state.items.reduce((acc, item) => {
		return acc + item.price;
	}, 0)
);

function checkout() {
	alert('Coming soon...hopefully');
}
</script>

<template>
	<DrawerUtility :show-drawer="show" @close="$emit('close', false)">
		<template #heading>
			<h2>Your Cart {{ itemsStore.state.items.length > 0 ? `(${itemsStore.state.items.length})` : '' }}</h2>
		</template>
		<template #default>
			<section>
				<div v-for="item in itemsStore.state.items" :key="item.id" class="w-full item-in-cart">
					<img :src="item.image" width="60" height="60" />
					<div class="item-details">
						<p>{{ item.title }}</p>
						<div class="item-price">
							<span>${{ item.price }}</span>
							<span class="item-remove" @click="itemsStore.removeItem(item)">Remove</span>
						</div>
					</div>
				</div>
			</section>
		</template>
		<template #footer>
			<footer class="w-full">
				<h2 class="w-full item-summary">
					<span>Total</span>
					<span>${{ totalCost }}</span>
				</h2>
				<button @click="checkout()">Continue to Checkout</button>
			</footer>
		</template>
	</DrawerUtility>
</template>

<style scoped lang="scss">
.item-remove {
	cursor: pointer;
	transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

	&:hover {
		color: black;
	}
}

button {
	cursor: pointer;
	height: 3rem;
	border: 0;
	outline: none;
	color: white;
	width: 100%;
	display: block;
	text-align: center;
	background: linear-gradient(0deg, #462ddf, #462ddf), #1a1a1a;
	border-radius: 8px;
	transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
	font-size: 1rem;

	&:hover {
		font-weight: 600;
		background: white;
		color: #462ddf;
		border: 0.2rem solid #462ddf;
	}
}

.item-summary {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 700;
}

img {
	padding: 1rem;
	border: 1px solid rgba(26, 26, 26, 0.1);
	border-radius: 8px;
}

.item-details {
	padding: 1rem;

	width: 90%;
	p {
		margin: 0 0 1rem 0;
	}

	.item-price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: rgba(26, 26, 26, 0.5);
	}
}

.item-in-cart {
	display: flex;
	margin-bottom: 1rem;
}
</style>
