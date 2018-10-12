import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { StyleBoundary, Button } from '@diff/shared-components';
import { connect } from 'react-redux';
import actions from './actions';

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

class Inspector extends React.Component {
  static propTypes = {
    show: PropTypes.bool,

    dispatch: PropTypes.func.isRequired,
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

  render() {
    const {
      props: { show },
      state: { showHelp }
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
        </div>
      </StyleBoundary>,

      this.el
    );
  }
}

/**
 * Outside components should not directly invoke inspectors
 * actions, instead this exposes a render props method with
 * an underlying dispatcher that handles what a component would
 * normally need to do without exposing the underlying details
 *
 */
Inspector.Toggle = connect()(({ dispatch, children }) => (
  <React.Fragment>
    {children(() => dispatch(actions.setActive(true)))}
  </React.Fragment>
));

const mapStateToProps = state => ({
  show: state.inspector.active
});

export default connect(
  mapStateToProps,
  null
)(Inspector);
