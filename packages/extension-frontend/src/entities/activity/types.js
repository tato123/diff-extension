const CREATE_EVENTLOG_REQUEST = '@diff/activity/createRequest';
const CREATE_EVENTLOG_SUCCESS = '@diff/activity/createSuccess';
const CREATE_EVENTLOG_FAILED = '@diff/activity/createFailed';

const ADD_USER_SEEN_ACTIVITY = '@diff/entities/activity/add';
const ADD_USER_SEEN_ACTIVITY_FAILED = '@diff/entities/activity/failed';

const PERSIST_ACTIVITY_RECORD_REQUEST =
  '@diff/entities/activity/persist/request';
const PERSIST_ACTIVITY_RECORD_SUCCESS =
  '@diff/entities/activity/persist/success';
const PERSIST_ACTIVITY_RECORD_FAILED = '@diff/entities/activity/persist/failed';

export default {
  CREATE_EVENTLOG_REQUEST,
  CREATE_EVENTLOG_SUCCESS,
  CREATE_EVENTLOG_FAILED,

  ADD_USER_SEEN_ACTIVITY,
  ADD_USER_SEEN_ACTIVITY_FAILED,

  PERSIST_ACTIVITY_RECORD_REQUEST,
  PERSIST_ACTIVITY_RECORD_SUCCESS,
  PERSIST_ACTIVITY_RECORD_FAILED
};
