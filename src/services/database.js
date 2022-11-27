import Dexie from 'dexie';

// https://dexie.org/docs/Dexie/Dexie

export function db(dbName) {
    return new Dexie(dbName);
}