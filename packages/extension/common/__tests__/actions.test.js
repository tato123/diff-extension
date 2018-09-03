import actions from "../actions";
import types from "../types";

describe("actions", () => {
  it("should create a run request", () => {
    expect(actions.runRequest).toEqual({
      type: types.RUN_REQUEST.REQUEST
    });
  });
});
