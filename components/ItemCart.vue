<script setup lang="ts">
import { shallowRef, onBeforeMount } from 'vue';
import type { Item } from '@/types/Item';

const itemsInCart = shallowRef<Item[]>([]);
onBeforeMount(() => {
	const itemsInStorage = localStorage.getItem('voxel:cartItems');
	if (itemsInStorage) {
		itemsInCart.value = JSON.parse(itemsInStorage) as Item[];
	}
});

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
</script>

<template>
	<DrawerUtility :show-drawer="show" @close="$emit('close', false)" />
</template>
