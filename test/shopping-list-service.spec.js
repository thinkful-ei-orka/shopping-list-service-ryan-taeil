const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List mockup', function() {
  let db;

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  let listItems = [
    {
      id: 1,
      name: 'Chicken',
      price: '12.22',
      date_added: Date.now(),
      checked: false,
      category: 'Main'
    },
    {
      id: 2,
      name: 'Potato Chips',
      price: '4.58',
      date_added: Date.now(),
      checked: false,
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Sandwich',
      price: '8.14',
      date_added: Date.now(),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 4,
      name: 'Eggs',
      price: '6.33',
      date_added: Date.now(),
      checked: false,
      category: 'Breakfast'
    }
  ];
});

// get




// insert



// update



// delete
