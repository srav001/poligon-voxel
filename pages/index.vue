<script>
import itemStore from '@/helper/itemsStore';

export default {
	name: 'IndexPage',
	data() {
		return {
			itemsByCategory: {},
			itemsDisplayed: [],
			items: [],
			categories: [],
			showCart: false
		};
	},
	async fetch() {
		this.categories = await this.$http.$get('https://fakestoreapi.com/products/categories');
		this.items = await this.$http.$get('https://fakestoreapi.com/products');
		this.itemsDisplayed = this.items;
	},
	computed: {
		itemsInCart() {
			return itemStore.items.value;
		}
	},
	beforeMount() {
		this.items.forEach(item => {
			if (this.itemsByCategory[item.category]) {
				this.$set(this.itemsByCategory, item.category, [...this.itemsByCategory[item.category], item]);
			} else {
				this.$set(this.itemsByCategory, item.category, [item]);
			}
		});
	},
	methods: {
		filterByCategory(category) {
			this.itemsDisplayed = category === 'all' ? this.items : this.itemsByCategory[category];
		}
	}
};
</script>

<template>
	<main>
		<HeaderBar @open-cart="showCart = true" />
		<section id="banner">Welcome to Voxel Store!</section>
		<SectionSwitcher :categories="categories" @choose-category="filterByCategory($event)" />
		<section id="category-section" class="px-common">
			<TransitionGroup name="cart-items" tag="div" class="row">
				<ItemCard v-for="item in itemsDisplayed" :key="item.id" class="col-3" :item="item"></ItemCard>
			</TransitionGroup>
		</section>
		<ItemCart :show="showCart" @close="showCart = false" />
	</main>
</template>

<style>
#banner {
	height: 23rem;
	background-color: rgb(128, 128, 128, 0.2);
	border: 1px solid rgb(128, 128, 128, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}

.row {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 0.75rem;
}

.cart-items-move,
.cart-items-enter-active,
.cart-items-leave-active {
	transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-items-enter,
.cart-items-enter-from,
.cart-items-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>
