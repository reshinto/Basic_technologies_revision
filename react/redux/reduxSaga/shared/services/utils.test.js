import cloneDeep from "lodash/cloneDeep";

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc"
};

import {
  getColumnOrder,
  getColumnOrderDir,
  replaceObjectValues
} from "./utils";


describe("Other utils - getColumnOrderDir", () => {
  it("Should return ASC", () => {
    const res = getColumnOrderDir(true);

    expect(res).toEqual(SORT_DIRECTIONS.ASC);
  });

  it("Should return DESC", () => {
    const res = getColumnOrderDir(false);

    expect(res).toEqual(SORT_DIRECTIONS.DESC);
  });
});

describe("Other utils - getColumnOrder", () => {
  it("Should return orderBy and orderDir", () => {
    const res = getColumnOrder([]);
    const res1 = getColumnOrder([{ id: "name", desc: true }]);
    const res2 = getColumnOrder([{ id: "name", desc: false }]);

    expect(res).toEqual({});
    expect(res1).toEqual({ orderBy: "name", orderDir: SORT_DIRECTIONS.ASC });
    expect(res2).toEqual({ orderBy: "name", orderDir: SORT_DIRECTIONS.DESC });
  });
});

describe("Other utils - replaceObjectValues", () => {
  it("Should replace object values", () => {
    const obj = { a: "a" };
    const targetObj = { a: "t", b: "t" };

    replaceObjectValues({ obj, targetObj });

    expect(targetObj).toEqual({
      a: "a",
      b: "t"
    });
  });
});
