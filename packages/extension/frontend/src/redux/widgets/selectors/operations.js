import { actions as widgetActions } from "redux/widgets/state";

const showDiffForSelector = selector => dispatch => {
  dispatch(
    widgetActions.show("diff", {
      selector
    })
  );
};

export default {
  showDiffForSelector
};
