import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MainMenu from './MainMenu';
import ControlPanel from './ControlPanel';

const LauncherContainer = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 32px;
  right: 32px;
  display: flex;
  align-items: center;

  > div {
    margin-right: 16px;
  }
`;

class Launcher extends React.PureComponent {
  static propTypes = {
    /**
     * Diff Count
     */
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
      props: { count },
      state: { open },
      toggle
    } = this;
    return (
      <LauncherContainer>
        <MainMenu count={count} showCount onClick={toggle} />
        <ControlPanel open={open} />
      </LauncherContainer>
    );
  }
}

const mapStateToProps = () => ({
  count: 0
});

export default connect(mapStateToProps)(Launcher);
