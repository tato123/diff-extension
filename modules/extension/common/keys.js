export const CONTENT_SCRIPT_PORT_NAME = "@diff/portname/contentScript";
export const CONTENT_SCRIPT_SOURCE_NAME = "@diff/content";
export const BACKGROUND_SCRIPT_PORT_NAME = "@diff/background";

export const MESSAGES_FRONTEND_SOURCE = "@diff/frontend";
export const MESSAGES_BACKGROUND_SOURCE = "@diff/background";

const namespacedAction = name => `@diff/${name}`;

const asyncAction = actionType => ({
  REQUEST: namespacedAction(`${actionType}/request`),
  SUCCESS: namespacedAction(`${actionType}/success`),
  FAILED: namespacedAction(`${actionType}/failed`)
});

export const ACTIONS = {
  AUTHENTICATION: asyncAction("authentication"),
  FETCH_USER_PREFERENCES: asyncAction("FETCH_USER_PREFERENCES"),
  STORE_USER_PREFERENCES: asyncAction("STORE_USER_PREFERENCES"),
  RUN_REQUEST: asyncAction("RUN_REQUEST"),
  LOGIN: asyncAction("LOGIN"),
  CACHE_TOKEN: asyncAction("CACHE_TOKEN"),
  FETCH_CACHE_TOKEN: asyncAction("FETCH_CACHE_TOKEN")
};
