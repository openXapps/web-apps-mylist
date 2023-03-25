import { createContext, useReducer } from 'react';
import Dexie from 'dexie';

import AppContextReducer from './AppReducer';
import { validateDB } from '../services/dbops';
// import { initialUse } from '../helpers/initializer';
// import { getSettings } from '../helpers/localstorage';

// https://reactjs.org/docs/context.html

// Load IndexedDB instance
const db = new Dexie('SmartShopper');

// Initialize database from IDB instance
db.version(1).stores({
  list: '++id',
  item: '++id, listId'
});

// Log some IDB info to console
validateDB(db);

// Check for initial use and create sample data
db.list.count().then(docCount => {
  console.log(docCount)
  if (docCount === 0) {
    db.list.add({ listName: 'Weekly food shopping', inUse: true }).then(listId => {
      console.log(listId);
      db.item.add({ listId: listId, itemName: 'Brown bread', done: false });
      db.item.add({ listId: listId, itemName: 'Fresh milk', done: false });
      db.item.add({ listId: listId, itemName: 'Carrots', done: false });
      db.item.add({ listId: listId, itemName: 'Lamb chops', done: false });
    });
    db.list.add({ listName: 'Hardware store', inUse: false }).then(listId => {
      console.log(listId);
      db.item.add({ listId: listId, itemName: 'Hammer', done: false });
      db.item.add({ listId: listId, itemName: '5kWh Generator', done: false });
      db.item.add({ listId: listId, itemName: 'Roof paint', done: false });
      db.item.add({ listId: listId, itemName: 'Paint brush', done: false });
    });
  }
}).catch(error => {
  console.log(error);
});

/**
 * Set initial application context
 */
const contextData = {
  themeIsDark: true,
  db: db
};

// Create application context object
export const AppContext = createContext(contextData);

/**
 * Wrap application context around main app
 * @param {any} props Children components
 * @returns Wrapped component
 */
function AppStore(props) {
  const [appState, appDispatch] = useReducer(AppContextReducer, contextData);
  return (
    <AppContext.Provider value={[appState, appDispatch]}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppStore;