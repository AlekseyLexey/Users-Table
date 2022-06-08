import FilterBar from '../Core/FilterBar.js';
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
  getAllUsersCounts().then(res => pagination.pages = Math.ceil(res / 100)), //? or Math.ceil(JSON.parse(localStorage.getItem('__users__')).length / 100),
  1
);

resetBtn.addEventListener('click', async (e) => {
  await reset();
  ut.users = JSON.parse(localStorage.getItem('__users__')).slice(0, 100);
  await getAllUsersCounts().then(res => pagination.pages = Math.ceil(res / 100)); //? or pagination.pages = Math.ceil(JSON.parse(localStorage.getItem('__users__')).length / 100);
  pagination.page = 1;
});

const filter = new FilterBar('input[data-field="userId"]', 'input[data-field="userName"]', 'input[data-field="userAge"]');

const navigator = new Navigator(async (navigate) => {
  const page = parseInt(navigate.get('page'), 10);
  let data = JSON.parse(localStorage.getItem('__users__'));

  if (navigate.has('fId')) {
    const fId = navigate.get('fId');

    data = data.filter(item => item.id === +fId);

    filter._id.value = +fId;
  }

  if (navigate.has('fName')) {
    const fName = navigate.get('fName');

    data = data.filter(
      item =>
      item.name.toLowerCase().includes(fName.toLowerCase())
    );

    //! filter._name.value = fName;
  }

  if (navigate.has('fAge')) {
    const fAge = navigate.get('fAge');

    data = data.filter(item => item.age === +fAge);

    //! filter._age.value = +fAge;
  }

    pagination.pages = Math.ceil(data.length / 100);
    pagination.page = Math.min(page, pagination.pages);
    ut.users = data.slice((pagination.page - 1) * 100, pagination.page * 100);
});


filter.subscribe(filterBarHandler => {
  for (const [key, value] of Object.entries(filterBarHandler)) {
    if (value) {
      navigator.set(key, value);
    } else {
      navigator.remove(key);
    }
  }
});

pagination.on('move', nextPage => {
	navigator.set('page', nextPage);
});