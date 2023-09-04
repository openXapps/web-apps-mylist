import { createContext, useReducer } from 'react';
import Dexie from 'dexie';

import AppContextReducer from './AppReducer';
import { dbStores, initLoad } from '../services/dbops';

// https://reactjs.org/docs/context.html

// Load IndexedDB instance
const db = new Dexie('MyList');


/**
 * Initialize database from IDB instance
 * Ver 01: Renamed IDB from SmartShooper to MyList
 * Ver 02: Add new field listType
 */
db.version(2).stores(dbStores);

// Log some IDB info to console
// validateDB(db);

// Check for initial use and create sample data
initLoad(db);

// Set initial application context
const contextData = {
  themeIsDark: true,
  db: db
};

// Create application context provider object
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