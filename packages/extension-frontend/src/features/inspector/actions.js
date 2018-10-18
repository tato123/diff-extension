import types from './types';

const setActive = value => ({
  type: types.SET_ACTIVE,
  payload: {
    value
  }
});

export default { setActive };
