import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Widget from 'components/Widget';
import { navigate } from '@reach/router';
import MainMenu from './MainMenu';

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

export default class Launcher extends React.PureComponent {
  static propTypes = {
    /**
     * Diff Count
     */
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func
  };

  static defaultProps = {
    count: 0,
    onClick: () => {
      navigate('/inspect');
    }
  };

  render() {
    const {
      props: { count, onClick }
    } = this;
    return (
      <LauncherContainer>
        <MainMenu count={count} showCount onClick={onClick} />
      </LauncherContainer>
    );
  }
}
