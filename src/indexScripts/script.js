import Navigator from '../Core/Navigator.js';
import Paginator from '../Core/Pagination.js';
import UsersTable from '../Core/UsersTable.js';
import { reset, getArrayUsers, getUser, findUsersByName, findUsersByAge, getAllUsersCounts } from '../database/promise.js';

if (!localStorage.getItem('__users__')) {
  reset();
}

const newUserBtn = document.querySelector('[data-field="newUser"]');
const resetBtn = document.querySelector('[data-field="reset"]');

newUserBtn.addEventListener('click', () => {
  location = `/newUser.html`;
});

const ut = new UsersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  JSON.parse(localStorage.getItem('__users__')).slice(0, 100)
);

ut.on('edit', (userId) => location = `/editor.html?userId=${userId}`);

const pagination = new Paginator(
  document.querySelector('[data-mount="pagination"]'),
  Math.ceil(JSON.parse(localStorage.getItem('__users__')).length / 100),
  1
);

resetBtn.addEventListener('click', async (e) => {
  await reset();
  ut.users = JSON.parse(localStorage.getItem('__users__')).slice(0, 100);
  pagination.pages = Math.ceil(JSON.parse(localStorage.getItem('__users__')).length / 100);
  pagination.page = 1;
});

const navigator = new Navigator((navigate) => {
  const page = parseInt(navigate.get('page'), 10);
	pagination.page = page;
	ut.users = JSON.parse(localStorage.getItem('__users__')).slice((page - 1) * 100, page * 100);
});

pagination.on('move', nextPage => {
	navigator.set('page', nextPage);
});

const userNameInput = document.querySelector('[data-field="userName"]');

userNameInput.addEventListener('input', async e => {
  const target = e.target;
  const userNames = await findUsersByName(target.value);

  if (userNames.length) {
    ut.users = userNames;
    pagination.pages = 1;
  } else {
    ut.users = JSON.parse(localStorage.getItem('__users__')).slice(0, 100);
    pagination.pages = Math.ceil(JSON.parse(localStorage.getItem('__users__')).length / 100);
    pagination.page = 1;
  }
});

const userAgesInput = document.querySelector('[data-field="userAge"]');

userAgesInput.addEventListener('input', async e => {
  const target = e.target;
  const userAges = await findUsersByAge(+target.value);

  if (userAges.length) {
    ut.users = userAges;
    pagination.pages = 1;
  } else {
    ut.users = JSON.parse(localStorage.getItem('__users__')).slice(0, 100);
    pagination.pages = Math.ceil(JSON.parse(localStorage.getItem('__users__')).length / 100);
    pagination.page = 1;
  }
});