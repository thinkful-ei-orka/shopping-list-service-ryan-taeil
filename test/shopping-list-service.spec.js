'use strict';

const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List mockup', function () {
  let db;

  let listItems = [
    {
      id: 1,
      name: 'Chicken',
      price: '12.22',
      date_added: new Date('2020-05-20T23:09:07.838Z'),
      checked: false,
      category: 'Main',
    },
    {
      id: 2,
      name: 'Potato Chips',
      price: '4.58',
      date_added: new Date('2020-05-20T23:09:07.838Z'),
      checked: false,
      category: 'Snack',
    },
    {
      id: 3,
      name: 'Sandwich',
      price: '8.14',
      date_added: new Date('2020-05-20T23:09:07.838Z'),
      checked: false,
      category: 'Lunch',
    },
    {
      id: 4,
      name: 'Eggs',
      price: '6.33',
      date_added: new Date('2020-05-20T23:09:07.838Z'),
      checked: false,
      category: 'Breakfast',
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db.into('shopping_list').insert(listItems);
    });

    it(`getItems() fetches all items from 'shopping_list'`, () => {
      const expectedItems = listItems.map((item) => ({
        ...item,
        checked: false,
      }));
      return ShoppingListService.getItems(db).then((actual) => {
        expect(actual).to.eql(expectedItems);
      });
    });

    it(`getById() fetches an item by id from 'shopping_list'`, () => {
      const idToGet = 3;
      const thirdItem = listItems[idToGet - 1];
      return ShoppingListService.getById(db, idToGet).then((actual) => {
        expect(actual).to.eql({
          id: idToGet,
          name: thirdItem.name,
          date_added: thirdItem.date_added,
          price: thirdItem.price,
          category: thirdItem.category,
          checked: false,
        });
      });
    });

    it(`deleteItem() finds an item by id and removes it from 'shopping_list'`, () => {
      const idToDelete = 3;
      return ShoppingListService.deleteItem(db, idToDelete)
        .then(() => ShoppingListService.getItems(db))
        .then((allItems) => {
          // copy the test items array without the removed item
          const expected = listItems
            .filter((item) => item.id !== idToDelete)
            .map((item) => ({
              ...item,
              checked: false,
            }));
          expect(allItems).to.eql(expected);
        });
    });

    it(`updateItem() updates an item in 'shopping_list'`, () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        name: 'new title',
        price: '14.76',
        date_added: Date.now(),
        checked: true,
      };
      const originalItem = listItems[idOfItemToUpdate - 1];
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then((item) => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...originalItem,
            ...newItemData,
          });
        });
    });
  });

  context(`Given 'shopping_list' has no data`, () => {
    it(`getItems() returns an empty array`, () => {
      return ShoppingListService.getItems(db).then((actual) => {
        expect(actual).to.eql([]);
      });
    });

    it(`insertItem() inserts an item`, () => {
      const newItem = {
        name: 'New item',
        price: '10.00',
        date_added: Date.now(),
        checked: true,
        category: 'Lunch',
      };
      return ShoppingListService.insertItem(db, newItem).then((actual) => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          date_added: newItem.date_added,
          checked: newItem.checked,
          category: newItem.category,
        });
      });
    });
  });
});

// get

// insert

// update

// delete
