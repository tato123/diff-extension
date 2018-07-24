const namespacedAction = name => `@diff/${name}`;

const asyncAction = actionType => ({
  REQUEST: namespacedAction(`${actionType}/request`),
  SUCCESS: namespacedAction(`${actionType}/success`),
  FAILED: namespacedAction(`${actionType}/failed`)
});

export default {
  AUTHENTICATION: asyncAction("authentication"),
  FETCH_USER_PREFERENCES: asyncAction("fetchUserPreferences"),
  STORE_USER_PREFERENCES: asyncAction("storeUserPreferences"),
  RUN_REQUEST: asyncAction("runRequest"),
  LOGIN: asyncAction("login"),
  CACHE_TOKEN: asyncAction("cacheToken"),
  FETCH_CACHE_TOKEN: asyncAction("fetchCacheToken")
};
