import { createUser } from '../database/promise.js';

const nameInp = document.querySelector('[data-field="userName"]');
const ageInp = document.querySelector('[data-field="userAge"]');
const countInp = document.querySelector('[data-field="count"]');
const submitBtn = document.querySelector('[data-action="addUser"]');
const close = document.querySelector('.close');

close.addEventListener('click', (e) => {
	location = 'index.html';
});

const data = {
	name: null,
	age: null,
	counter: null
};

function isNull(x) {
	return Boolean(x);
}

nameInp.addEventListener('input', (e) => {
	data.name = isNull(e.target.value) ? e.target.value : null;
});

ageInp.addEventListener('input', (e) => {
	data.age = isNull(e.target.value) ? e.target.value : null;
});

countInp.addEventListener('input', (e) => {
	data.counter = isNull(e.target.value) ? e.target.value : null;
});

submitBtn.addEventListener('click', async (e) => {
	let flag = true;

	for (const item of Object.values(data)) {
		if (!item) {
			flag = !flag;
			break;
		}
	}

	if (flag) {
		await createUser(data);
		e.target.style.backgroundColor = 'blue';
		setTimeout(() => {
			location = `/index.html`;
		}, 2000);
	} else {
		e.target.style.backgroundColor = 'red';
	}
});