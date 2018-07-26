import View from "./view";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectors as selectorEntitySelectors } from "redux/entities/selectors";
import {
  selectors as widgetSelectors,
  operations,
  actions
} from "redux/widgets/selectors";

const mapStateToProps = createStructuredSelector({
  selectors: selectorEntitySelectors.cssSelectorIdsSelector(),
  inspectMode: widgetSelectors.inspectModeSelector()
});

const mapDispatchToProps = dispatch => ({
  showSelectorDetails: selector =>
    dispatch(operations.showDiffForSelector(selector)),
  inspect: () => dispatch(actions.inspect()),
  cancelInspect: () => dispatch(actions.cancelInspect()),
  createNewSelector: selector =>
    dispatch(operations.createNewSelector(selector))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
