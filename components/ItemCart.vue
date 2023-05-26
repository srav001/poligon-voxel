<script setup lang="ts">
import { onMounted, ref } from 'vue';

const showSlider = ref(false);
const mountOnHydrate = ref(false);

onMounted(() => {
	mountOnHydrate.value = true;
});
</script>
<template>
	<div>
		<button @click="showSlider = true">Show Slider</button>
		<DrawerUtility v-if="mountOnHydrate" :show-slider="showSlider" @close="showSlider = false" />
	</div>
</template>
