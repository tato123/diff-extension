import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { ic_keyboard_arrow_left as leftArrow } from 'react-icons-kit/md/ic_keyboard_arrow_left';
import styled from 'styled-components';
import { Route, Switch } from 'react-router';

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 auto;

  span {
    font-size: var(--df-font-lg);
    font-weight: 300;
  }
`;

const TextContainer = styled.div`
  width: 200px;
  overflow: hidden;
`;

export default class Header extends React.PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func
    }).isRequired
  };

  goBack = () => {
    const {
      props: { history }
    } = this;
    history.goBack();
  };

  render() {
    return (
      <Switch>
        <Route
          path="/workspace*"
          render={({ match }) => (
            <HeaderDiv>
              <Icon
                icon={leftArrow}
                onClick={this.goBack}
                style={{ cursor: 'pointer' }}
              />
              <TextContainer>Projects</TextContainer>
            </HeaderDiv>
          )}
        />
      </Switch>
    );
  }
}
