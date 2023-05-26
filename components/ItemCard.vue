<script setup lang="ts">
defineProps<{
	item: {
		id: number;
		title: string;
		price: number;
		category: string;
		image: string;
	};
}>();
</script>

<template>
	<div class="item mt-half">
		<img class="item-image" :src="item.image" :alt="item.title" width="180" height="250" />
		<div>
			<p>{{ item.title }}</p>
			<p style="color: gray">${{ item.price }}</p>
		</div>
		<button class="add-item">Add to cart</button>
	</div>
</template>

<style lang="scss" scoped>
.item {
	padding: 2rem;
	display: flex;
	margin-top: 0;
	align-items: center;
	flex-direction: column;
	border-radius: 0.7rem;
	border: 1px solid rgb(128, 128, 128, 0.2);
}

.add-item {
	border: 0;
	border-radius: 0.7rem;
	background-color: rgb(220, 220, 220, 0.3);
	padding: 1rem 4rem;
	font-weight: 600;
	transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

	&:hover {
		filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
		background-color: black;
		color: white;
		cursor: pointer;
	}
}
</style>
