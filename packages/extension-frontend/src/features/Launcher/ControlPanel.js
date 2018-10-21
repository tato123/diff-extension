import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

import { Icon } from 'react-icons-kit';

import { ic_people_outline as peopleOutline } from 'react-icons-kit/md/ic_people_outline';
import { ic_settings as settings } from 'react-icons-kit/md/ic_settings';
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
  z-index: 2147483000 !important;
  position: fixed !important;
  bottom: 20px;
  right: 20px;
  width: 376px !important;
  min-height: 250px !important;
  max-height: 704px !important;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  opacity: 1 !important;
  background: #fff;

  display: flex;
  flex-direction: column;
  transform: translateY(-124px);
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

const ControlPanel = ({ open }) => (
  <React.Fragment>
    {open && (
      <Container>
        <NavHeader>
          <Switch>
            <Route path="/annotations*" component={AnnotationHeader} />
            <Route path="/workspace*" component={WorkspaceHeader} />
          </Switch>
          <div className="iconGroup">
            <Link to="/workspace">
              <IconButton icon={peopleOutline} color="#fff" />
            </Link>
            <Link to={`${process.env.WEB_HOME}/app/account`} target="_blank">
              <IconButton icon={settings} color="#fff" />
            </Link>
          </div>
        </NavHeader>
        <ContentBody id="df-controlpanel-contentbody">
          <Switch>
            <Route path="/annotations*" component={AnnotationContent} />
            <Route path="/workspace*" component={WorkspaceContent} />
            <Redirect to="/annotations" />
          </Switch>
        </ContentBody>
      </Container>
    )}
  </React.Fragment>
);

ControlPanel.propTypes = {
  open: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

ControlPanel.defaultProps = {
  open: false
};

export default withRouter(ControlPanel);
