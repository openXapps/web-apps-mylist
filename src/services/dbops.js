// All IndexedDB operations will go here

/**
 * Validate the current DB details
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

