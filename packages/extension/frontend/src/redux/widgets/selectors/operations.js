import { actions as widgetActions } from "redux/widgets/state";

const showDiffForSelector = selector => dispatch => {
  dispatch(
    widgetActions.show({
      name: "diff",
      context: {
        selector
      }
    })
  );
};

export default {
  showDiffForSelector
};
