import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { StyleBoundary, Button } from '@diff/shared-components';
import { connect } from 'react-redux';
import actions from './actions';
import SelectElement from './components/highlight';

const InspectContainer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const InspectorContent = styled.div`
  width: 50vw;
  height: 200px;
  background: #fff;
  justify-self: center;
  align-self: center;
  margin: 0 auto;
  padding: 20px;
`;

class InnerInspector extends React.Component {
  static propTypes = {
    /**
     * Whether our inspector should be shown
     */
    show: PropTypes.bool,

    /**
     * When the inspector receives a value,
     * we will call our value function with a value
     */
    onValue: PropTypes.func.isRequired,

    /**
     * Balancing ability to quickly prototype
     * over correctness.
     */
    dispatch: PropTypes.func.isRequired,

    /**
     * When the user performs a cancellation event
     * we will report this back
     */
    onCancel: PropTypes.func
  };

  static defaultProps = {
    show: false,
    onCancel: () => {}
  };

  state = {
    showHelp: true
  };

  modalRoot = document.getElementById('df-root-inspect');

  el = document.createElement('div');

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  handleOncancel = () => {
    const {
      props: { onCancel, dispatch }
    } = this;

    dispatch(actions.setActive(false));
    onCancel();
  };

  dismissHelp = () => {
    this.setState({ showHelp: false });
  };

  onSelectElement = element => {
    /* eslint-disable react/destructuring-assignment */
    this.props.onValue({ element });
  };

  onCancelSelect = reason => {
    this.props.onCancel(reason);
  };

  render() {
    const {
      props: { show },
      state: { showHelp },
      onSelectElement,
      onCancelSelect
    } = this;

    return ReactDOM.createPortal(
      <StyleBoundary>
        <div>
          {show &&
            showHelp && (
              <InspectContainer>
                <InspectorContent>
                  <p>
                    Click any element to add a comment or attach files. If you
                    want to get back, click the button in the bottom right of
                    the screen.
                  </p>
                  <Button primary onClick={this.dismissHelp}>
                    Close
                  </Button>
                </InspectorContent>
              </InspectContainer>
            )}
          {show &&
            !showHelp && (
              <SelectElement
                onSelect={onSelectElement}
                onCancel={onCancelSelect}
              />
            )}
        </div>
      </StyleBoundary>,

      this.el
    );
  }
}

/**
 * Outside components should not directly invoke inspectors
 * actions. Otherwise code-splitting and lazy loading doesn't work.
 * Instead we create a render prop component to abstract it and when this
 * component is needed everything is loaded in.
 */
const Inspector = ({
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

const mapStateToProps = state => ({
  show: state.inspector.active
});

const mapDispatchToProps = (dispatch, props) => ({
  setActive: value => dispatch(actions.setActive(value)),
  dispatch,
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
