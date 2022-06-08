import Observable from "./Observable.js";

class FilterBar extends Observable {
	_id = null;
	_name = null;
	_age = null;

	constructor(id, name, age) {
		super();

		this._id = document.querySelector(id);
		this._name = document.querySelector(name);
		this._age = document.querySelector(age);

		this._id.addEventListener('input', this.apply);
		this._name.addEventListener('input', this.apply);
		this._age.addEventListener('input', this.apply);
	}

	apply = () => {
		this.dispatch({
			fId: this._id.value,
			fName: this._name.value,
			fAge: this._age.value,
		})
	}
}

export default FilterBar;