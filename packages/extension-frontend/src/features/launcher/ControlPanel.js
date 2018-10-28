import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Spring, animated, config } from 'react-spring';

import { ic_people_outline as peopleOutline } from 'react-icons-kit/md/ic_people_outline';
import { ic_settings as settings } from 'react-icons-kit/md/ic_settings';
import * as easings from 'd3-ease';
import Link from '../../components/Link';
import IconButton from '../../components/IconButton';

import {
  Header as AnnotationHeader,
  Content as AnnotationContent
} from '../annotations';
import {
  Header as WorkspaceHeader,
  Content as WorkspaceContent
} from '../workspace';

const Container = styled.div`
  .base {
    z-index: 2147483000;
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 376px;
    height: 100%;
    min-height: 250px;
    max-height: 500px;
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16) !important;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;

    display: flex;
    flex-direction: column;
    will-change: transform, opacity;
  }
`;

const NavHeader = styled.div`
  height: calc(22px + 16px * 2);
  position: relative;
  background: var(--gradient-header);

  background-blend-mode: overlay;
  color: #fff;
  transition: height 0.16s ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  .iconGroup {
    div:first-child {
      margin-right: var(--df-space-3);
    }
  }
`;

const ContentBody = styled.div`
  max-height: 512px;
  min-height: 200px;
  height: 400px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;
class ControlPanel extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    active: false
  };

  state = {
    height: 670,
    stable: false
  };

  componentDidMount() {
    const height = window.innerHeight;

    this.setState({
      height: height - height * 0.5
    });
  }

  handleRest = () => {
    this.setState({
      stable: true
    });
  };

  render() {
    const { active } = this.props;
    const { stable, height } = this.state;
    const { handleRest } = this;
    return (
      <Container>
        <Spring
          native
          from={{
            y: 30,
            o: 0
          }}
          to={{
            y: active ? 0 : 30,
            o: active ? 1 : 0
          }}
          config={{
            tension: 1200,
            friction: 40
          }}
          onRest={handleRest}
        >
          {({ y, o }) => (
            <animated.div
              className="base"
              style={{
                height,
                opacity: o,
                transform: y.interpolate(yV => `translate3d(0,${yV}px,0)`)
              }}
            >
              <NavHeader>
                <Switch>
                  <Route path="/annotations*" component={AnnotationHeader} />
                  <Route path="/workspace*" component={WorkspaceHeader} />
                  <Redirect to="/annotations" />
                </Switch>
                <div className="iconGroup">
                  <Link to="/workspace">
                    <IconButton icon={peopleOutline} color="#fff" />
                  </Link>
                  <Link
                    to={`${process.env.WEB_HOME}/app/account`}
                    target="_blank"
                  >
                    <IconButton icon={settings} color="#fff" />
                  </Link>
                </div>
              </NavHeader>
              {stable && (
                <ContentBody id="df-controlpanel-contentbody">
                  <Switch>
                    <Route path="/annotations*" component={AnnotationContent} />
                    <Route path="/workspace*" component={WorkspaceContent} />
                  </Switch>
                </ContentBody>
              )}
            </animated.div>
          )}
        </Spring>
      </Container>
    );
  }
}

export default withRouter(ControlPanel);
