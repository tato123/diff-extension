import { ACTIONS } from "../common/keys";
import {
  validateCanRunRequestSuccess,
  validateCanRunRequestFailed,
  cacheTokenFailed,
  cacheTokenSuccess
} from "./actions";
import { getUserToken, storeUserToken } from "./token";

const handleCanRun = (tabId, postMessageToTab) => {
  getUserToken()
    .then(user => {
      if (user == null) {
        throw new Error("No user token available");
      }
      return user;
    })
    .then(user =>
      postMessageToTab(
        tabId,
        validateCanRunRequestFailed("Did not specify autorun")
      )
    )
    .catch(err =>
      postMessageToTab(tabId, validateCanRunRequestFailed(err.message))
    );
};

const handleCacheTokenRequest = (tabId, postMessageToTab, action) => {
  storeUserToken(action.payload.token)
    .then(() => postMessageToTab(tabId, cacheTokenSuccess()))
    .catch(() => postMessageToTab(tabId, cacheTokenFailed("Not able to save")));
};

export default {
  [ACTIONS.VALIDATE_CAN_RUN.REQUEST]: handleCanRun,
  [ACTIONS.CACHE_TOKEN.REQUEST]: handleCacheTokenRequest
};
