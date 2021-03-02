import checkPropTypes from "check-prop-types";
import {createStore} from "redux";

import rootReducer from "../src/reducers";

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 *
 * @name storeFactory
 * @function
 * @param {object} initialState Initial state for store.
 * @returns {Store} Redux store.
 */
export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState);
}

/**
 * Return node(s) with the given data-test attribute.
 *
 * @name findByTestAttr
 * @function
 * @param {ShallowWrapper} wrapper Enzyme shallow wrapper.
 * @param {string} value{ Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
}

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
}
