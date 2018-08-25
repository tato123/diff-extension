import View from "./Selectors";
import { connect } from "react-redux";
import finder from "@medv/finder";
import { selectors as selectorEntitySelectors } from "redux/entities/selectors";
import {
  selectors as widgetSelectors,
  operations,
  actions
} from "redux/widgets/selectors";
import { inspect } from "./utils/highlightElement";

const mapStateToProps = (state, props) => ({
  selectors: selectorEntitySelectors.cssSelectorIdsSelector()(state),
  inspectMode: widgetSelectors.inspectModeSelector()(state),
  getSeenCount: element => widgetSelectors.seenCountSelector(element)(state),
  getUnseenCount: element =>
    widgetSelectors.unseenCountSelector(element)(state),
  selectorForElement: finder,
  domInspect: inspect,
  diffOpenForSelector: widgetSelectors.displayedSelector()(state)
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
