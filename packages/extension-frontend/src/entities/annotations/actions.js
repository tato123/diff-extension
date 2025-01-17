import types from './types';

const addSelector = payload => ({
  type: types.ADD_SELECTOR,
  payload
});

const createTransientSelector = cssSelector => ({
  type: types.ADD_NEW_SELECTOR,
  payload: {
    id: cssSelector
  }
});

const deleteSelector = selectorId => ({
  type: types.DELETE_SELECTOR,
  payload: {
    selectorId
  }
});

export default {
  addSelector,
  createTransientSelector,
  deleteSelector
};
