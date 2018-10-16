import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { ic_keyboard_arrow_left as leftArrow } from 'react-icons-kit/md/ic_keyboard_arrow_left';
import styled from 'styled-components';
import DynamicFont from 'react-dynamic-font';
import { Route, Switch } from 'react-router';
import { Logo } from '@diff/shared-components';

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
        <Route exact path="/annotations" render={() => <Logo.Text />} />

        <Route
          path="/annotations/:id"
          render={({ match }) => (
            <HeaderDiv>
              <Icon
                icon={leftArrow}
                onClick={this.goBack}
                style={{ cursor: 'pointer' }}
              />
              <TextContainer>
                <DynamicFont content={match.params.id} />
              </TextContainer>
            </HeaderDiv>
          )}
        />
      </Switch>
    );
  }
}
