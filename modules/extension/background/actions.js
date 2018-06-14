import { ACTIONS, BACKGROUND_SCRIPT_PORT_NAME } from "../common/keys";

export const forceRun = token => ({
  type: ACTIONS.RUN_REQUEST.REQUEST,
  payload: {
    context: {
      token
    }
  }
});

export const composeRemoteAction = action =>
  Object.assign(
    {},
    {
      source: BACKGROUND_SCRIPT_PORT_NAME
    },
    action
  );

export const validateCanRunRequestSuccess = token => ({
  type: ACTIONS.VALIDATE_CAN_RUN.SUCCESS,
  payload: {
    token
  }
});

export const validateCanRunRequestFailed = err => ({
  type: ACTIONS.VALIDATE_CAN_RUN.SUCCESS,
  payload: {
    token: ""
  },
  meta: {
    err
  }
});

export const cacheTokenFailed = err => ({
  type: ACTIONS.CACHE_TOKEN.FAILED,
  payload: {
    err
  }
});

export const cacheTokenSuccess = () => ({
  type: ACTIONS.CACHE_TOKEN.SUCCESS
});
