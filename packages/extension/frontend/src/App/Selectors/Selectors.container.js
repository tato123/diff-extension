import View from "./Selectors";
import { connect } from "react-redux";

import { selectors as selectorEntitySelectors } from "redux/entities/selectors";
import {
  selectors as widgetSelectors,
  operations,
  actions
} from "redux/widgets/selectors";

const mapStateToProps = (state, props) => ({
  selectors: selectorEntitySelectors.cssSelectorIdsSelector()(state),
  inspectMode: widgetSelectors.inspectModeSelector()(state),
  getSelectorCount: element => widgetSelectors.countForSelector(element)(state)
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
