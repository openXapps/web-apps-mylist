import { createContext, useReducer } from 'react';
import Dexie from 'dexie';

import AppContextReducer from './AppReducer';
import { validateDB } from '../services/dbops';
// import { initialUse } from '../helpers/initializer';
// import { getSettings } from '../helpers/localstorage';

// https://reactjs.org/docs/context.html

/**
 * Load IndexedDB instance
 */
const db = new Dexie('SmartShopper');
db.open()
  .then(db => {
    validateDB(db);
  })
  .catch('NoSuchDatabaseError', e => {
    // Database with that name did not exist
    console.error('Database not found: ', e.message);
    console.error('Creating version 1...');
    db.version(1).stores({
      list: '++id',
      item: '++id'
    });
    db.list.add({ listName: 'Weekly food shopping', inUse: false })
      .then(id => {
        db.item.add({ listId: id, itemName: 'Brown bread', done: false });
        db.item.add({ listId: id, itemName: 'Fresh milk', done: false });
        db.item.add({ listId: id, itemName: 'Carrots', done: false });
        db.item.add({ listId: id, itemName: 'Lamb chops', done: false });
      })
  }).catch(Error, e => {
    // Any other error derived from standard Error
    console.error("Error: " + e.message);
  }).catch(e => {
    // Other error such as a string was thrown
    console.error(e);
  });

/**
 * Initial state
 * Loads default password data on first use
 */
// initialUse();

/**
 * Setting default application context
 */
const contextData = {
  themeIsDark: true
};

/**
 * Create application context object
 */
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