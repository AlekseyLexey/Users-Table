import { updateUser } from '../database/promise.js';

const params = parseInt(new URLSearchParams(document.location.search)
	.get('userId'), 10);
let thisUserId = JSON.parse(localStorage.getItem('__users__'))[`${params - 1}`];
const userId = document.querySelector('[data-field="userId"]');
const userName = document.querySelector('[data-field="userName"]');
const userAge = document.querySelector('[data-field="userAge"]');
const userCount = document.querySelector('[data-field="userCount"]');
const submit = document.querySelector('.submit');
const data = {
	name: null,
	age: null,
	counter: null
};

const close = document.querySelector('.close');

close.addEventListener('click', (e) => {
	location = 'index.html';
});

		const {id, name, age, counter} = thisUserId;
		userId.value = id;

		userName.addEventListener('input', inputHandler);
		userName.value = name;
		data.name = name;

		userAge.addEventListener('input', inputHandler);
		userAge.value = age;
		data.age = age;

		userCount.addEventListener('input', inputHandler);
		userCount.value = counter;
		data.counter = counter;

userName.addEventListener('input', inputHandler);
userAge.addEventListener('input', inputHandler);
userCount.addEventListener('input', inputHandler);

function inputHandler() {
	if (this.type === 'number') {
		if (isNaN(parseInt(this.value, 10))) {
			data[`${this.name}`] = parseInt(0, 10);
		} else {
			data[`${this.name}`] = parseInt(this.value, 10);
		}
	} else {
		data[`${this.name}`] = this.value;
	}
}

submit.addEventListener('click', async (e) => {
	await updateUser(params, data);

	e.target.textContent = 'Saved!';
	setTimeout(() => {
		location = `/index.html`;
	}, 2000);
});
