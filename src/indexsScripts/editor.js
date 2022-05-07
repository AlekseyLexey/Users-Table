const params = parseInt(new URLSearchParams(document.location.search)
	.get('userId'), 10);
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

for (const user of JSON.parse(localStorage.getItem('__users__'))) {
	if (user.id === params) {
		const {id, name, age, counter} = user;
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

		break;
	}
}

function inputHandler() {
	if (this.type === 'number') {
		data[`${this.name}`] = parseInt(this.value, 10);
	} else {
		data[`${this.name}`] = this.value;
	}
}

submit.addEventListener('click', () => {
	
});