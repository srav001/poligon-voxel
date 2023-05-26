import Vue from 'vue';
import type { Item } from '@/types/Item';

function updateLocalStorage(items: Item[]) {
	localStorage.setItem('voxel:cartItems', JSON.stringify(items));
}

const store = {
	state: Vue.observable({
		items: [] as Item[]
	}),
	checkIfExists(item: Item) {
		return this.state.items.find(i => i.id === item.id) !== undefined;
	},
	addItem(item: Item) {
		if (!this.checkIfExists(item)) {
			this.state.items.push(item);
			updateLocalStorage(this.state.items);
		}
	},
	removeItem(item: Item) {
		if (this.checkIfExists(item)) {
			this.state.items = this.state.items.filter(i => i.id !== item.id);
			updateLocalStorage(this.state.items);
		}
	}
};

if (process.client) {
	const storedItems = localStorage.getItem('voxel:cartItems');
	if (storedItems) {
		store.state.items = JSON.parse(storedItems);
	}
}

export default store;
