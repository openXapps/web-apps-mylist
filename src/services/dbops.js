// IndexedDB utilities file

/**
 * IndexedDB stores
 */
export const dbStores = {
  list: '++id, listName, listOrder',
  item: '++id, listId, itemName, itemOrder'
};

/**
 * Empty shopping list model
 */
export const emptyList = [
  {
    listName: '',
    inUse: false,
    listOrder: 1,
    listType: '',
    items: [
      { listId: 0, itemName: '', itemOrder: 1, done: false },
    ]
  },
];

/**
 * Input field properties
 */
export const inputFieldProps = {
  listName: { maxLength: 30 },
  itemName: { maxLength: 40 },
}

/**
 * Type of lists
 */
export const listTypes = [
  { index: 0, label: 'Shopping' },
  { index: 1, label: 'ToDo' }
];

/**
 * This service determinds whether the app is loaded for the fist time
 * or has the user opened the app before.
 * First time users needs to be configured.
 * This service must be called before React Context is loaded.
 * @param {any} db DexieJS database store
 */
export function initLoad(db) {
  db.list.count().then(docCount => {
    // console.log(docCount)
    if (docCount === 0) {
      db.list.add({ listName: 'Weekly food shopping', inUse: true, listOrder: 1, listType: 0 }).then(listId => {
        // console.log(listId);
        db.item.add({ listId: listId, itemName: 'Brown bread', itemOrder: 1, done: false });
        db.item.add({ listId: listId, itemName: 'Fresh milk', itemOrder: 2, done: false });
        db.item.add({ listId: listId, itemName: 'Carrots', itemOrder: 3, done: false });
        db.item.add({ listId: listId, itemName: 'Lamb chops', itemOrder: 4, done: false });
      });
      db.list.add({ listName: 'Saturday gardening', inUse: false, listOrder: 2, listType: 1 }).then(listId => {
        // console.log(listId);
        db.item.add({ listId: listId, itemName: 'Mow the lawn', itemOrder: 1, done: false });
        db.item.add({ listId: listId, itemName: 'Rake leaves', itemOrder: 2, done: false });
        db.item.add({ listId: listId, itemName: 'Wash windows', itemOrder: 3, done: false });
        db.item.add({ listId: listId, itemName: 'Clean gutters', itemOrder: 4, done: false });
        db.item.add({ listId: listId, itemName: 'Trim hedge', itemOrder: 4, done: false });
      });
    }
  }).catch(error => {
    console.log(error);
  });
};

/**
 * Validate the current DB details - Not used
 * @param db {any} IndexedDB to validate
 */
export function validateDB(db) {
  let result = false;
  try {
    console.log("Found database   : " + db.name);
    console.log("Database version : " + db.verno);
    db.tables.forEach((table) => {
      console.log("Found table      : " + table.name);
      console.log("Table Schema     : " + JSON.stringify(table.schema, null, 4));
    });
    result = true;
  } catch (e) {
    result = false;
  } finally {
    return result;
  }
};

