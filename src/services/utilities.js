/**
 * Return item object from arry by Id
 * @param items {any} Items array
 * @param byId {number} Id to find in Items array
 * @returns Array of an Item object
 */
export function getItem(items, byId) {
  // console.log(byId, items);
  let result = [];
  if (Array.isArray(items)) {
    result = items.filter(item => item.id === byId);
  }
  return result;
}