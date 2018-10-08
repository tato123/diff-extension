import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Logo, Header, Label } from '@diff/shared-components';
import { Route, Switch } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

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
  padding: 32px;
  position: relative;
  background: var(--gradient-header);

  background-blend-mode: overlay;
  color: #fff;
  -webkit-transition: height 0.16s ease-out;
  transition: height 0.16s ease-out;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TestRoute = () => <h1>hello</h1>;

const ControlPanel = ({ open, history }) => (
  <React.Fragment>
    {open && (
      <Container>
        <NavHeader>
          <Logo.Text />
        </NavHeader>
        <div
          style={{
            height: '512px',
            textAlign: 'center',
            padding: '20px'
          }}
        >
          <Link to="/">Default</Link>
          <Link to="/page1">Page 1</Link>
          <Link to="/page2">Page 2</Link>
          <Switch>
            <Route path="/page1" render={() => <h1>route 3</h1>} />
            <Route path="/page2" component={TestRoute} />
            <Route
              render={() => (
                <React.Fragment>
                  <Header as="h1">Welcome</Header>
                  <Label>
                    Diff is the best tool ever. To get started, target an
                    element on the page.
                  </Label>
                </React.Fragment>
              )}
            />
          </Switch>
          <button type="button" onClick={() => history.goBack()}>
            Pop
          </button>
        </div>
      </Container>
    )}
  </React.Fragment>
);

ControlPanel.propTypes = {
  open: PropTypes.bool
};

ControlPanel.defaultProps = {
  open: false
};

export default withRouter(ControlPanel);
