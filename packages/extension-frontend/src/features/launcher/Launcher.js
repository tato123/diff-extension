import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MainMenu from './MainMenu';
import ControlPanel from './ControlPanel';

import selectors from './selectors';

const LauncherContainer = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 32px;
  right: 32px;
  display: flex;
  align-items: center;

  transition: opacity 150ms ease-out;

  opacity: ${props => (props.show ? 1 : 0)};

  > div {
    margin-right: 16px;
  }
`;

class Launcher extends React.PureComponent {
  static propTypes = {
    /**
     * Diff Count
     */
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    isInspecting: PropTypes.bool.isRequired
  };

  static defaultProps = {
    count: 0
  };

  state = {
    open: false
  };

  toggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      props: { count, isInspecting },
      state: { open },
      toggle
    } = this;

    return (
      <LauncherContainer show={!isInspecting}>
        <MainMenu count={count} showCount onClick={toggle} />
        <ControlPanel open={open} />
      </LauncherContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  count: selectors.countSelector,
  isInspecting: selectors.isInspectingSelector
});

export default connect(mapStateToProps)(Launcher);
