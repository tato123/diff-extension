import types from './types';

const getFirebaseToken = () => ({
  type: types.GET_FIREBASE_TOKEN
});

const selectWorkspace = workspaceId => ({
  type: types.SELECT_WORKSPACE,
  payload: {
    workspaceId
  }
});

const loginToFirebaseSuccess = () => ({
  type: types.LOGIN_TO_FIREBASE_SUCCESS
});

const loginToFirebasFailed = () => ({
  type: types.LOGIN_TO_FIREBASE_FAILED
});

const sessionInitFailed = error => ({
  type: types.SESSION_INIT_FAILED,
  payload: {
    error
  }
});

const sessionInitSuccess = () => ({
  type: types.SESSION_INIT_SUCCESS
});

export default {
  getFirebaseToken,
  selectWorkspace,
  loginToFirebaseSuccess,
  loginToFirebasFailed,
  sessionInitFailed,
  sessionInitSuccess
};
