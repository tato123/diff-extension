import { types } from '@diff/common/dist/actions';

const GET_FIREBASE_TOKEN = types.GET_FIREBASE_TOKEN.REQUEST;
const GET_FIREBASE_TOKEN_SUCCESS = types.GET_FIREBASE_TOKEN.SUCCESS;
const SELECT_WORKSPACE = '@diff/entities/session/selectWorkspace';
const LOGIN_TO_FIREBASE_SUCCESS =
  '@diff/entities/session/loginToFirebaseSuccess';

const LOGIN_TO_FIREBASE_FAILED = '@diff/entities/session/loginToFirebaseFailed';

const SESSION_INIT_FAILED = '@diff/entities/session/initSessionFailed';
const SESSION_INIT_SUCCESS = '@diff/entities/session/initSessionSuccess';
const SET_DEFAULT_WORKSPACE = '@diff/entities/session/setDefaultWorkspace';
const SET_DEFAULT_WORKSPACE_SUCCESS =
  '@diff/entities/session/setDefaultWorkspace/success';
const SET_DEFAULT_WORKSPACE_FAILED =
  '@diff/entities/session/setDefaultWorkspace/failed';

export default {
  GET_FIREBASE_TOKEN,
  GET_FIREBASE_TOKEN_SUCCESS,
  SELECT_WORKSPACE,
  LOGIN_TO_FIREBASE_SUCCESS,
  SESSION_INIT_FAILED,
  LOGIN_TO_FIREBASE_FAILED,
  SESSION_INIT_SUCCESS,
  SET_DEFAULT_WORKSPACE,
  SET_DEFAULT_WORKSPACE_SUCCESS,
  SET_DEFAULT_WORKSPACE_FAILED
};
