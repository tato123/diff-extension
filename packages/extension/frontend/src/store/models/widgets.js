// @flow
import { createSelector } from "reselect";

export default {
  state: [{ name: "launcher" }],
  reducers: {
    show: (state, payload) => [...state, payload],
    hide: (state, payload) => state.filter(x => x.name === payload.name)
  },
  selectors: {
    isVisible: name =>
      createSelector(
        state => state,
        widgets => widgets.filter(x => x.name === name).length > 0
      )
  }
};
