/**
 * @typedef {object} User
 * @property {string} name - Имя пользователя
 * @property {number} age - Возраст пользователя
 * @property {number} counter - Баланс счета пользователя
 */

import getUsers from "./getUsers.js";

const APP_KEY = "__users__";

/** @type {User[]} */
const users = (() => {
	const json = localStorage.getItem(APP_KEY);
	return json ? JSON.parse(json) : getUsers();
})();

/**
 * Сброс базы данных пользователей до заводских настроек.
 */
export function reset() {
	return timer().then(() => {
		users.splice(0);
		users.push(...getUsers());
		save();
	});
}

/**
 * Поиск пользователя по id
 * @param id
 */
export function getUser(id) {
	return timer().then(() => {
		const user = users.find((user) => user.id === id);

		if (user) {
			const clone = getCopy(user);
			return clone;
		}

		return user;
	});
}

/**
 * Поиск пользователей по ids.
 * @param {array} ids - Массив ids.
 * @returns {Promise{array}} Пользоваетли с таким именем.
 */
export function getArrayUsers(...ids) {
	return timer().then(() => {
		let counter = 0;

		const IdsUsers = Array(ids.length)
			.fill()
			.map((_) => {
				let item = users.find(user => user.id === ids[counter]);
				counter++;
				return item;
			});

		const copyIdsUsers = [];
		
		for (const user of IdsUsers) {
			if (user) {
				copyIdsUsers.push(getCopy(user));
			}
		}

		return copyIdsUsers;
	});
}

/**
 * Поиск по имени (возвращает массив пользователей по имени)
 * @param {string} name - Search name.
 * @returns {Promise{array}} Пользоваетли с таким именем.
 */
export function findUsersByName(name) {
	return timer().then(() => {
		const usersByName = users.filter(user => user.name === name);

		return usersByName.map(item => getCopy(item));
	});
}

/**
 * Поиск по возрасту (возвращает массив пользователей по возрасту)
 * @param {number} age - Age Search.
 * @returns {Promise{array}} Пользоваетли с таким возрастом.
 */
 export function findUsersByAge(age) {
	return timer().then(() => {
		const usersByAge = users.filter(user => user.age === age);

		return usersByAge.map(item => getCopy(item));
	});
}

/**
 * Создание нового пользователя
 * @param {object} data
 * @param {string} data.name
 * @param {number} data.age
 * @param {number} data.counter
 */
export function createUser(data) {
	return timer().then(() => {
		const id = Math.max(0, ...users.map((user) => user.id)) + 1;
		const user = { id, ...data };
		const clone = getCopy(user);

		users.push(user);
		save();

		return clone;
	});
}

/**
 * Удаление пользователя
 * @param {number} id - id удаляемого пользователя
 */
export function removeUser(id) {
	return timer().then(() => {
		const index = users.findIndex((user) => user.id === id);
		let flag = false;

		if (index !== -1) {
			flag = true;
			users.splice(index, 1);
			save();
		}

		return flag;
	});
}

/**
 * Обновление пользователя
 * @param {number} id - id обновляемого пользователя
 * @param {object} data - данные обновляемого пользователя
 * @param {string} data.name
 * @param {number} data.age
 * @param {number} data.counter
 */
export function updateUser(id, data) {
	return timer().then(() => {
		const user = users.find((user) => user.id === id);

		if (user) {
			for (const key of "name age counter".split(" ")) {
				if (data[key]) {
					user[key] = data[key];
				}
			}

			save();
		}

		return getCopy(user);
	});
}

/**
 * @returns {Promise{number}} кол-во пользователей
 */
export function getAllUsersCounts() {
	return timer().then(() => users.length);
}

function timer() {
	const delay = 100 + Math.floor(Math.random() * 400);
	return new Promise((resolve) => setTimeout(resolve, delay));
}

function getCopy(x) {
	return JSON.parse(JSON.stringify(x));
}

function save() {
	localStorage.setItem(APP_KEY, JSON.stringify(users));
}
