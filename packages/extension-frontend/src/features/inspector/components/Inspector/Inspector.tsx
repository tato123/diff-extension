import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import actions from '../../redux/actions';
import InnerInspector from './InnerInspector';
import selectors from '../../redux/selectors';
import { actions as activityActions } from '../../../../entities/activity';

export declare function onCancel(values: any): any;
export declare function onValue(values: any): any;
export declare function setActive(values: any): any;

type caller = () => void;

interface InspectorProps {
  setActive(a: boolean): any;
  onCancel(): any;
  onValue(): {};
  dispatch(): {};
  children(arg1: caller, arg2: caller): React.ReactNode;
  show: any;
  createActivityRecord: any;
}

/**
 * Outside components should not directly invoke inspectors
 * actions. Otherwise code-splitting and lazy loading doesn't work.
 * Instead we create a render prop component to abstract it and when this
 * component is needed everything is loaded in.
 */
const Inspector: React.SFC<InspectorProps> = ({
  children,
  setActive,
  ...rest
}) => (
  <React.Fragment>
    {children(() => setActive(true), () => setActive(false))}
    <InnerInspector {...rest} />
  </React.Fragment>
);

const makeMapStateToProps = () => {
  const helpSeenSelector = selectors.makeHashActivityRecordSelector({
    type: 'guide',
    name: 'inspector_help'
  });

  return createStructuredSelector({
    helpSeen: helpSeenSelector,
    show: selectors.inspectorActiveSelector
  });
};

const mapStateToProps = (state: {}) => ({
  show: state.inspector.active
});

const mapDispatchToProps = (dispatch: Dispatch, props: InspectorProps) => ({
  setActive: value => dispatch(actions.setActive(value)),
  createActivityRecord: (recordType: string, record: {}) =>
    dispatch(activityActions.createActivityRecord(recordType, record)),

  onCancel: (...args) => {
    dispatch(actions.setActive(false));
    props.onCancel && props.onCancel(...args);
  },
  onValue: (...args) => {
    dispatch(actions.setActive(false));
    props.onValue && props.onValue(...args);
  }
});

export default withRouter(
  connect(
    makeMapStateToProps(),
    mapDispatchToProps
  )(Inspector)
);
