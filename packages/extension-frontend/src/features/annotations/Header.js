import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Route, Switch } from 'react-router';
import { Logo, Label } from '@diff/shared-components';
import { Transition, animated } from 'react-spring';
import * as easings from 'd3-ease';
import BackButton from '../../components/BackButton';

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
  align-self: center;
  display: flex;
`;

const AnnotationLabel = styled(Label)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
  display: block;
  font-size: var(--df-font-md) !important;
`;

const AnimationContainer = styled.div`
  position: absolute;
  display: flex;
`;

const Header1 = ({ style, location }) => (
  <AnimationContainer style={style}>
    <Logo.Text />
  </AnimationContainer>
);

const Header2 = ({ goBack, style, location, match }) => (
  <AnimationContainer style={style}>
    <HeaderDiv>
      <BackButton onClick={goBack} />
      <TextContainer>
        <AnnotationLabel as="body1">{match.params.id}</AnnotationLabel>
      </TextContainer>
    </HeaderDiv>
  </AnimationContainer>
);

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
    const { location } = this.props;
    console.log(location.pathname);
    const isFirst = location.pathname === 'annotations';
    return (
      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <Transition
          items={location.pathname}
          keys={location.pathname}
          from={{
            opacity: 0,
            transform: isFirst ? 'translateX(-20px)' : 'translateX(-20px)',
            position: 'absolute'
          }}
          enter={{
            transform: isFirst ? 'translateX(0px)' : 'translateX(0px)',
            opacity: 1,
            position: 'absolute'
          }}
          leave={{
            transform: isFirst ? 'translateX(20px)' : 'translateX(20px)',
            opacity: 0,
            position: 'absolute'
          }}
        >
          {path =>
            path === '/annotations'
              ? props => (
                <AnimationContainer style={props}>
                  <Logo.Text />
                </AnimationContainer>
                )
              : props => (
                <Route
                  render={({ match }) => (
                    <AnimationContainer style={props}>
                      <HeaderDiv>
                        <BackButton onClick={this.goBack} />
                        <TextContainer>
                          <AnnotationLabel as="body1">
                            {match.params.id}
                          </AnnotationLabel>
                        </TextContainer>
                      </HeaderDiv>
                    </AnimationContainer>
                    )}
                />
                )
          }
        </Transition>
      </div>
    );
  }
}
