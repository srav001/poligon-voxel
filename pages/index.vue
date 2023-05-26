<script>
export default {
	name: 'IndexPage',
	data() {
		return {
			postByCategory: {},
			postsDisplayed: [],
			posts: [],
			categories: []
		};
	},
	async fetch() {
		this.categories = await this.$http.$get('https://fakestoreapi.com/products/categories');
		this.posts = await this.$http.$get('https://fakestoreapi.com/products');
		this.postsDisplayed = this.posts;
	},
	beforeMount() {
		this.posts.forEach(post => {
			if (this.postByCategory[post.category]) {
				this.$set(this.postByCategory, post.category, [...this.postByCategory[post.category], post]);
			} else {
				this.$set(this.postByCategory, post.category, [post]);
			}
		});
	},
	methods: {
		filterByCategory(category) {
			this.postsDisplayed = category === 'all' ? this.posts : this.postByCategory[category];
		}
	}
};
</script>

<template>
	<main>
		<HeaderBar />
		<section id="banner">Welcome to Voxel Store!</section>
		<SectionSwitcher :categories="categories" @choose-category="filterByCategory($event)" />
		<section id="category-section" class="px-common">
			<TransitionGroup name="cart-items" tag="div" class="grid">
				<ItemCard v-for="item in postsDisplayed" :key="item.id" :item="item"></ItemCard>
			</TransitionGroup>
		</section>
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

.grid {
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
