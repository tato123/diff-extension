import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { StyleBoundary, Button } from '@diff/shared-components';
import actions from '../../redux/actions';
import SelectElement from '../highlight';

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
  height: 164px;
  background: #fff;
  justify-self: center;
  align-self: center;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  button {
    justify-content: flex-end;
    text-align: right;
  }
`;

interface InnerInspectorProps {
  show: boolean;
  onValue: any;
}

export default class InnerInspector extends React.Component<
  InnerInspectorProps
> {
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
    if (this.modalRoot) {
      this.modalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.modalRoot) {
      this.modalRoot.removeChild(this.el);
    }
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
    const {
      props: { onValue }
    } = this;
    onValue({ element });
  };

  onCancelSelect = reason => {
    const {
      props: { onCancel }
    } = this;
    onCancel(reason);
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
                  <Button.Flat primary onClick={this.dismissHelp}>
                    Close
                  </Button.Flat>
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
