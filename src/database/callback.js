/**
 * @typedef {object} User
 * @property {string} name - Имя пользователя
 * @property {number} age - Возраст пользователя
 * @property {number} counter - Баланс счета пользователя
 */

/**
 * @callback userCallback
 * @param {User} user
 */

/**
 * @callback successCallback
 * @param {boolean} flag
 */

/**
 * @callback emptyCallback
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
 * @param {emptyCallback} callback
 */
export function reset(callback) {
	timer(() => {
		users.splice(0);
		users.push(...getUsers());
		save();

		callback();
	});
}

/**
 * Поиск пользователя по id
 * @param id
 * @param {userCallback} callback
 */
export function getUser(id, callback) {
	timer(() => {
		const user = users.find((user) => user.id === id);

		if (user) {
			const clone = getCopy(user);
			return callback(clone);
		}

		callback(user);
	});
}

/**
 * Создание нового пользователя
 * @param {object} data
 * @param {string} data.name
 * @param {number} data.age
 * @param {number} data.counter
 * @param {userCallback} callback
 */
export function createUser(data, callback) {
	timer(() => {
		const id = Math.max(0, ...users.map((user) => user.id)) + 1;
		const user = { id, ...data };
		const clone = getCopy(user);

		users.push(user);
		save();

		callback(clone);
	});
}

/**
 * Удаление пользователя
 * @param {number} id - id удаляемого пользователя
 * @param {successCallback} callback
 */
export function removeUser(id, callback) {
	timer(() => {
		const index = users.findIndex((user) => user.id === id);
		let flag = false;

		if (index !== -1) {
			flag = true;
			users.splice(index, 1);
			save();
		}

		callback(flag);
	});
}

/**
 * Обновление пользователя
 * @param {number} id - id обновляемого пользователя
 * @param {object} data - данные обновляемого пользователя
 * @param {string} data.name
 * @param {number} data.age
 * @param {number} data.counter
 * @param {userCallback} callback
 */
export function updateUser(id, data, callback) {
	timer(() => {
		const user = users.find((user) => user.id === id);

		if (user) {
			for (const key of "name age counter".split(" ")) {
				if (data[key]) {
					user[key] = data[key];
				}
			}

			save();
		}

		callback(getCopy(user));
	});
}

function timer(callback) {
	const delay = 100 + Math.floor(Math.random() * 400);
	const end = new Date(Date.now() + delay).getTime();

	const intervalFlag = setInterval(() => {
		if (Date.now() > end) {
			clearInterval(intervalFlag);
			callback();
		}
	});
}

function getCopy(x) {
	return JSON.parse(JSON.stringify(x));
}

function save() {
	localStorage.setItem(APP_KEY, JSON.stringify(users));
}
