import EventEmitter from "./EventEmitter.js";

const usersTableTemplate = document.querySelector('template[data-template="usersTable"]');
const userRowTemplate = document.querySelector('template[data-row="userRow"]');

const priceFormater = new Intl.NumberFormat("ru-RU", {
	style: "currency",
	currency: "RUB",
});

class UsersTable extends EventEmitter {
	_users = [];
	_root = null;

	constructor(root, users) {
		super();

		this._root = root;
		this._users = users;

		this.update();
	}

	get users() {
		return this._users;
	}

	set users(users) {
		this._users = users;
		this.update();
	}

	update() {
		this._root.textContent = '';
		const usersTableTemplateClone = usersTableTemplate.content.cloneNode(true);
		const tbody = usersTableTemplateClone.querySelector('tbody');

		for (const user of this._users) {
			const { id, name, age, counter } = user;

			const userRowTemplateClone = userRowTemplate.content.cloneNode(true);

			userRowTemplateClone.querySelector('[data-field="id"]').textContent = id;

			userRowTemplateClone.querySelector('[data-field="name"]').textContent = name;

			userRowTemplateClone.querySelector('[data-field="check"]').textContent = priceFormater.format(counter);

			userRowTemplateClone.querySelector(`[data-field="age"]`).textContent = age;

			userRowTemplateClone.querySelector('[data-field="action"]')
			.addEventListener('click', () => this.emit('edit', id));

			tbody.append(userRowTemplateClone);
		}

		this._root.append(usersTableTemplateClone);
	}
}

export default UsersTable;