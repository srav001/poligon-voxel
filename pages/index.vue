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
		<section id="banner">
			<h1 class="w-full">Welcome to Voxel Store!</h1>
			<p class="w-full">Discover our wide range of products</p>
		</section>
		<SectionSwitcher :categories="categories" @choose-category="filterByCategory($event)" />
		<section id="category-section" class="px-common">
			<TransitionGroup name="cart-items" tag="div" class="row">
				<ItemCard v-for="item in itemsDisplayed" :key="item.id" :item="item"></ItemCard>
			</TransitionGroup>
		</section>
		<ItemCart :show="showCart" @close="showCart = false" />
		<footer id="main-footer">
			<a>
				<span class="main-title"> Voxel </span>
				<span class="sub-title"> Store </span>
			</a>
		</footer>
	</main>
</template>

<style lang="scss">
#main-footer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 4rem;
	border-top: 1px solid rgba(26, 26, 26, 0.1);
	margin-top: 2rem;
}

#banner {
	height: 23rem;
	background-color: rgb(128, 128, 128, 0.2);
	border: 1px solid rgb(128, 128, 128, 0.2);
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
	justify-content: center;

	* {
		text-align: center;
	}

	h1 {
		font-size: 3rem;
	}
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
