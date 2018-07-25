import { actions as widgetActions } from "redux/widgets";

export const toggleDiffForSelector = action => dispatch => {
  dispatch(
    widgetActions.show({
      name: "diff",
      context: {
        selector: action.payload.selector
      }
    })
  );
};
