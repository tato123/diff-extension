import { actions as widgetActions } from "redux/widgets/state";
import { actions as selectorEntityActions } from "redux/entities/selectors";

const showDiffForSelector = selector => dispatch => {
  dispatch(
    widgetActions.show("diff", {
      selector
    })
  );
};

const createNewSelector = selector => dispatch => {
  console.log("creating a new selector", selector);
  dispatch(selectorEntityActions.addNewSelector(selector));
};

export default {
  showDiffForSelector,
  createNewSelector
};
