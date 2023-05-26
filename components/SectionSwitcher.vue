<script setup lang="ts">
import { shallowRef } from 'vue';

defineProps<{
	categories: string[];
}>();

const emit = defineEmits<{
	(e: 'choose-category', category: string): void;
}>();
const currentCategory = shallowRef('all');
function chooseCategory(category: string) {
	currentCategory.value = category;
	emit('choose-category', category);
}

function capitalize(text: string) {
	if (text.includes(`'s `)) {
		return text
			.split(`'s `)
			.map(str => str.charAt(0).toUpperCase() + str.slice(1))
			.join(`'s `);
	}

	return text.charAt(0).toUpperCase() + text.slice(1);
}
</script>

<template>
	<section class="w-full">
		<div class="w-full category-tabs">
			<span
				v-for="(category, key) in ['all', ...categories]"
				:key="key"
				class="tab"
				:class="{ 'active-item': category === currentCategory, 'ml-4rem': key === 0 }"
				@click="chooseCategory(category)">
				{{ capitalize(category) }}
			</span>
		</div>
	</section>
</template>

<style scoped lang="scss">
section {
	margin-bottom: 1.75rem;
}

.category-tabs {
	height: 4rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	border-collapse: separate;
	span.tab {
		position: relative;
		transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
		padding: 1.4em 0.1rem;
		margin: 0 0.5rem;
		transform: translate3d(0, 0, 0);
		color: gray;
		white-space: nowrap;
		cursor: pointer;
		&:first-child {
			margin-left: 6rem;
		}
		&:hover {
			color: black;
			cursor: pointer;
		}
		&:after {
			transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
			will-change: transform, box-shadow, opacity;
			position: absolute;
			content: '';
			height: 3px;
			bottom: 0px;
			left: 0px;
			right: 0px;
			border-radius: 3px 3px 0px 0px;
			background: black;
			opacity: 0;
			transform: scale(0, 1);
		}
		&.active-item {
			color: black;
			&:after {
				opacity: 1;
				transform: scale(1, 1);
			}
		}
	}
}
</style>
