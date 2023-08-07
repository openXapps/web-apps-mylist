// IndexedDB utilities file

/**
 * Empty shopping list model
 */
export const emptyList = [
  {
    listName: '',
    inUse: false,
    items: [
      { listId: 0, itemName: '', done: false },
    ]
  },
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
      db.list.add({ listName: 'Weekly food shopping', inUse: true }).then(listId => {
        // console.log(listId);
        db.item.add({ listId: listId, itemName: 'Brown bread', done: false });
        db.item.add({ listId: listId, itemName: 'Fresh milk', done: false });
        db.item.add({ listId: listId, itemName: 'Carrots', done: false });
        db.item.add({ listId: listId, itemName: 'Lamb chops', done: false });
      });
      db.list.add({ listName: 'Hardware store', inUse: false }).then(listId => {
        // console.log(listId);
        db.item.add({ listId: listId, itemName: 'Hammer', done: false });
        db.item.add({ listId: listId, itemName: '5kWh Generator', done: false });
        db.item.add({ listId: listId, itemName: 'Roof paint', done: false });
        db.item.add({ listId: listId, itemName: 'Paint brush', done: false });
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

