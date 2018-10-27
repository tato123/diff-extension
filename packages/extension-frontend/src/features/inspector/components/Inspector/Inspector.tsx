import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import actions from '../../actions';
import InnerInspector from './InnerInspector';

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
}

/**
 * Outside components should not directly invoke inspectors
 * actions. Otherwise code-splitting and lazy loading doesn't work.
 * Instead we create a render prop component to abstract it and when this
 * component is needed everything is loaded in.
 */
const Inspector: React.SFC<InspectorProps> = ({
  dispatch,
  show,
  setActive,
  onCancel,
  onValue,
  children
}) => (
  <React.Fragment>
    {children(() => setActive(true), () => setActive(false))}
    <InnerInspector
      dispatch={dispatch}
      show={show}
      onCancel={onCancel}
      onValue={onValue}
    />
  </React.Fragment>
);

const mapStateToProps = (state: {}) => ({
  show: state.inspector.active
});

const mapDispatchToProps = (dispatch: Dispatch, props: InspectorProps) => ({
  setActive: value => dispatch(actions.setActive(value)),
  onCancel: (...args) => {
    dispatch(actions.setActive(false));
    props.onCancel && props.onCancel(...args);
  },
  onValue: (...args) => {
    dispatch(actions.setActive(false));
    props.onValue && props.onValue(...args);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inspector);
