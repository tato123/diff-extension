import types from './types';

const addDiff = payload => ({
  type: types.ADD_DIFF,
  payload
});

export default {
  addDiff
};
