import Navigator from './Core/Navigator.js';
import Paginator from './Core/Pagination.js';
import UsersTable from './Core/UsersTable.js';
import { reset, getArrayUsers, getUser, findUsersByName, findUsersByAge, getAllUsersCounts } from './database/promise.js';


reset();

const ut = new UsersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  JSON.parse(localStorage.getItem('__users__')).slice(0, 100)
);

const pagination = new Paginator(
  document.querySelector('[data-mount="pagination"]'),
  Math.ceil(JSON.parse(localStorage.getItem('__users__')).length / 100),
  1
);

const navigator = new Navigator((navigate) => {
  const page = parseInt(navigate.get('page'), 10);
	pagination.page = page;
	ut.users = JSON.parse(localStorage.getItem('__users__')).slice((page - 1) * 100, page * 100);
});

pagination.on('move', nextPage => {
	// pagination.page = nextPage;
	// ot.orders = store.orders.slice((nextPage - 1) * 5, nextPage * 5);

	navigator.set('page', nextPage);
});


const usersAges = findUsersByAge(25);

usersAges.then(users => users.forEach(item => {
  console.log(item);
}));

// getAllUsersCounts().then(count => console.log(count));