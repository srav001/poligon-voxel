import Vue from 'vue';
import type { Item } from '@/types/Item';

const store = {
	state: Vue.observable({
		items: [] as Item[]
	}),
	addItem(item: Item) {
		const checkIfExists = this.state.items.find(i => i.id === item.id);
		if (!checkIfExists) {
			this.state.items.push(item);
		}
	}
};

export default store;
