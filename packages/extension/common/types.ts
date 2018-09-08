import { AnyAction } from "redux";

const namespacedAction = (name: string): string => `@diff/common/${name}`;

export interface AsyncType {
  REQUEST: string;
  SUCCESS: string;
  FAILED: string;
}

const asyncAction = (actionType: string): AsyncType => ({
  REQUEST: namespacedAction(`${actionType}/request`),
  SUCCESS: namespacedAction(`${actionType}/success`),
  FAILED: namespacedAction(`${actionType}/failed`)
});

export default {
  FETCH_USER_PREFERENCES: asyncAction("fetchUserPreferences"),
  RUN_REQUEST: asyncAction("runRequest"),
  LOGIN: asyncAction("login"),
  CACHE_TOKEN: asyncAction("cacheToken"),
  FETCH_CACHE_TOKEN: asyncAction("fetchCacheToken")
};
