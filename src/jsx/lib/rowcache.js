import dot from 'dot-object';
import {map} from 'underscore';
import merge from 'deepmerge';

let cache = {};

function parseKey(key) {
	return map(key, (k) => {
		return k.toString().replace('.', '_');
	}).join('.');
}

class RowCache {
	constructor(base = {}) {
		this.init(base);
	}

	init(base = null) {
		cache = base;

		return this;
	}

	read(key) {
		let k = parseKey(key);
		return dot.pick(k, cache);
	}

	write(key, value) {
		let k = parseKey(key);
		let writable = {};

		writable[k] = value;
		writable = dot.object(writable);

		if (cache) {
			cache = merge(cache, writable);
		} else {
			cache = writable;
		}

		return this;
	}

	flush(key = null) {
		if (key) {
			let k = parseKey(key);
			dot.remove(k, cache);
		} else {
			this.init();
		}

		return this;
	}
}

const rowcache = new RowCache();

export default rowcache;
