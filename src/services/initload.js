/**
 * Initial load service
 * This service determinds whether the app is loaded for the fist time
 * or has the user opened the app before.
 * First time users needs to be configured.
 * This service must be called before React Context is loaded.
 */

export function initLoad() {

};

/**
 * First time use sample shopping lists
 */
export const initShoppingLists = [
  {
    id: '1',
    name: 'Weekly food shopping',
    inUse: true,
    items: [
      { id: '1.1', value: 'Bread', done: false },
      { id: '1.2', value: 'Milk', done: false },
      { id: '1.3', value: 'Carrots', done: false },
      { id: '1.4', value: 'Apples', done: true },
      { id: '1.5', value: 'Meat', done: false },
    ]
  },
  {
    id: '2',
    name: 'Hardware store',
    inUse: true,
    items: [
      { id: '2.1', value: 'Hammer', done: false },
      { id: '2.2', value: 'Generator', done: false },
      { id: '2.3', value: 'Paint', done: false },
      { id: '2.4', value: 'Paint brushes', done: false },
    ]
  }
];