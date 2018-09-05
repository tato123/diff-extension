import actions from "../actions";
import types from "../types";

describe("actions", () => {
  it("should create a run request", () => {
    expect(actions.runRequest()).toEqual({
      type: types.RUN_REQUEST.REQUEST
    });
  });

  it("compose remote action returns expected", () => {
    const action = actions.runRequest();
    expect(actions.composeRemoteAction(action, "a", "b")).toEqual({
      ...action,
      source: "a",
      dest: "b"
    });
  });

  describe("fetch", () => {
    it("request", () => {
      expect(actions.fetchUserPreferences()).toEqual({
        type: types.FETCH_USER_PREFERENCES.REQUEST
      });
    });

    it("success", () => {
      expect(actions.fetchUserPreferencesSuccess({ a: "b" })).toEqual({
        type: types.FETCH_USER_PREFERENCES.SUCCESS,
        payload: {
          preferences: {
            a: "b"
          }
        }
      });
    });

    it("failed", () => {
      expect(actions.fetchUserPreferencesFailed("test")).toEqual({
        type: types.FETCH_USER_PREFERENCES.FAILED,
        payload: {
          error: "test"
        }
      });
    });
  });

  describe("set cache token", () => {
    it("request", () => {
      expect(actions.cacheTokenRequest("token")).toEqual({
        type: types.CACHE_TOKEN.REQUEST,
        payload: {
          token: "token"
        }
      });
    });

    it("success", () => {
      expect(actions.cacheTokenSuccess()).toEqual({
        type: types.CACHE_TOKEN.SUCCESS
      });
    });
    it("failed", () => {
      expect(actions.cacheTokenFailed("test")).toEqual({
        type: types.CACHE_TOKEN.FAILED,
        payload: {
          error: "test"
        }
      });
    });
  });

  describe("get cache token", () => {
    it("request", () => {
      expect(actions.fetchCacheToken()).toEqual({
        type: types.FETCH_CACHE_TOKEN.REQUEST
      });
    });

    it("success", () => {
      expect(actions.fetchCacheTokenSuccess("test")).toEqual({
        type: types.FETCH_CACHE_TOKEN.SUCCESS,
        payload: {
          token: "test"
        }
      });
    });
    it("failed", () => {
      expect(actions.fetchCacheTokenFailed("test")).toEqual({
        type: types.FETCH_CACHE_TOKEN.FAILED,
        payload: {
          error: "test"
        }
      });
    });
  });
});
