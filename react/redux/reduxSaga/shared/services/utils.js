// required only if implementing sort and pagination
import isUndefined from "lodash/isUndefined";

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc"
};

export const replaceObjectValues = ({ obj, targetObj }) =>
  Object.entries(obj).forEach(([k, v]) => {
    targetObj[k] = v;
  });

export const getColumnOrderDir = (value) => {
  if (isUndefined(value)) return;

  return value ? SORT_DIRECTIONS.ASC : SORT_DIRECTIONS.DESC;
};

export const getColumnOrder = (sortBy) => {
  const orderBy = sortBy[0]?.id;
  const orderDir = getColumnOrderDir(sortBy[0]?.desc);

  return {
    orderBy,
    orderDir
  };
};
