import Observable from "./Observable.js";

class Navigator extends Observable{
	_data = {};

	constructor(handler) {
		super();

		const params = new URLSearchParams(location.search);

		for (const [key, value] of params) {
			this._data[key] = value;
		}

		if (handler) {
			this.subscribe(handler);
			this.dispatch(this);
		}
	}

	has(key) {
		return this._data.hasOwnProperty(key);
	}

	get(key, defaultValue = 1) {
		if (this._data.hasOwnProperty(key)) {
			return this._data[key];
		}

		return defaultValue;
	}

	set(key, value) {
		this._data = {
			...this._data,
			[key]: value
		};

		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(this._data)) {
			params.append(key, value);
		}

		history.pushState(null, null, `?${params.toString()}`);
		this.dispatch(this);
	}

	remove(key) {
		if (!this._data.hasOwnProperty(key)) {
			return;
		}

		delete this._data[key];
		
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(this._data)) {
			params.append(key, value);
		}

		history.pushState(null, null, `?${params.toString()}`);
		this.dispatch(this);
	}
}

export default Navigator;