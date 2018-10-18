import types from './types';

const createEventLogRequest = docId => ({
  type: types.CREATE_EVENTLOG_REQUEST,
  payload: {
    docId
  }
});

const createEventLogSuccess = docId => ({
  type: types.CREATE_EVENTLOG_SUCCESS,
  payload: {
    docId
  }
});

const createEventLogFailed = (docId, err) => ({
  type: types.CREATE_EVENTLOG_FAILED,
  payload: {
    docId,
    err
  }
});

const addUserSeenActivity = data => ({
  type: types.ADD_USER_SEEN_ACTIVITY,
  payload: {
    ...data
  }
});

const addUserSeenActivityFailed = err => ({
  type: types.ADD_USER_SEEN_ACTIVITY_FAILED,
  payload: {
    err
  }
});

export default {
  createEventLogRequest,
  createEventLogSuccess,
  createEventLogFailed,
  addUserSeenActivity,
  addUserSeenActivityFailed
};
