import types from "./types";

const updateItemsSeen = arrayOfIds => ({
  type: types.UPDATE_ITEMS_SEEN,
  payload: {
    ids: arrayOfIds
  }
});

const writeUpdateItemsSeenSuccess = arrayOfIds => ({
  type: types.WRITE_UPDATE_ITEMS_SEEN_SUCCESS,
  payload: {
    ids: arrayOfIds
  }
});

const writeUpdateItemsSeenFailed = (arrayOfIds, err) => ({
  type: types.WRITE_UPDATE_ITEMS_SEEN_SUCCESS,
  payload: {
    ids: arrayOfIds,
    err
  }
});

const closeDiff = selectorId => ({
  type: types.CLOSE_DIFF,
  payload: {
    selectorId
  }
});

export default {
  updateItemsSeen,
  writeUpdateItemsSeenFailed,
  writeUpdateItemsSeenSuccess,
  closeDiff
};
