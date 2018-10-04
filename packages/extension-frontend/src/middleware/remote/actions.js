import types from './types';

const postMessage = action => ({
  type: types.POST_MESSAGE,
  payload: {
    action
  }
});

export default {
  postMessage
};
