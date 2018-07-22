export const toggleDiffForSelector = action => dispatch => {
  dispatch.widgets.show({
    name: "diff",
    context: {
      selector: payload.selector
    }
  });
};
