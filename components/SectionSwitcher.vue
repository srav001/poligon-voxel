<script setup lang="ts">
import { shallowRef } from 'vue';

const props = defineProps<{
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

const allCategories = ['all', ...props.categories];
</script>

<template>
	<section class="w-full">
		<div class="w-full category-tabs">
			<span
				v-for="(category, key) in allCategories"
				:key="key"
				class="tab"
				:class="{ 'active-item': category === currentCategory, 'ml-4rem': key === 0 }"
				@click="chooseCategory(category)">
				{{ capitalize(category) }}
			</span>
		</div>
		<div id="select-wrapper" class="w-full">
			<select class="category-select">
				<option
					v-for="(category, key) in allCategories"
					:key="key"
					:value="category"
					@change="chooseCategory(category)">
					{{ capitalize(category) }}
				</option>
			</select>
		</div>
	</section>
</template>

<style scoped lang="scss">
section {
	margin-bottom: 1.75rem;
}

#select-wrapper {
	display: flex;
	justify-content: center;
	align-content: center;
}
</style>
