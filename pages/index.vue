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
	</main>
</template>

<style scoped>
#banner {
	height: 23rem;
	background-color: rgb(128, 128, 128, 0.2);
	border: 1px solid rgb(128, 128, 128, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
