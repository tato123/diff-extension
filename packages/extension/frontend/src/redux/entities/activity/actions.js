import types from "./types";

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

const readSeenActivity = data => ({
  type: types.READ_SEEN_ACTIVITY,
  payload: data
});

export default {
  createEventLogRequest,
  createEventLogSuccess,
  createEventLogFailed,
  readSeenActivity
};
