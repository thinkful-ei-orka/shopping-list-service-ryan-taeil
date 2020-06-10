'use strict';
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

function searchProductByName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((data) => {
      console.log(data);
    });
}

searchProductByName('Fish');

function paginateItems(pageNum) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNum - 1);
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then((data) => {
      console.log(data);
    });
}

// paginateItems(2)

function searchAfterDate(daysAgo) {
  let date = new Date();
  date.setDate(date.getDate() - daysAgo);

  knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added', '>', date)
    .orderBy([{ column: 'date_added', order: 'DESC' }])
    .then((data) => {
      console.log('logging date');
      console.log(data);
    });
}

// searchAfterDate(2);

function getTotalCost() {
  const categories = ['Main', 'Snack', 'Lunch', 'Breakfast'];

  categories.forEach((category) => {
    knexInstance
      .select('*')
      .from('shopping_list')
      .where({ category: category })
      .then((data) => {
        console.log(`${category} Total: $${getTotal(data)}`);
      });
  });
}

function getTotal(data) {
  let total = 0;
  data.forEach((item) => {
    let price = parseFloat(item.price);
    total += price;
    total = Math.round(total * 100) / 100;
  });
  return total;
}

// getTotalCost();
