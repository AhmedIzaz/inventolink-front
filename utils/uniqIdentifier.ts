export const createUniqueList = ({ list, key }) => {
  const map = new Map();
  list?.forEach((item:any) => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return Array.from(map.values());
};
