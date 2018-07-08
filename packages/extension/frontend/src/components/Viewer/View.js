import React from "react";
import PropTypes from "prop-types";
import {
  Widget,
  Form,
  Logo,
  Select,
  Tabs,
  Grid,
  Draggable
} from "@diff/shared-components";

import styled from "styled-components";
import Popper from "components/Popper";
import { Assets, Diff, Thread } from "./Tabs";
import { Route, Switch, Redirect, matchPath } from "react-router";
import _ from "lodash";

const MainWindow = styled.div`
  width: 340px;
  height: 627px;
  background: linear-gradient(to right, #171a3a, #221f41);
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 24px;
  z-index: 999999999;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  * {
    box-sizing: border-box;
  }
`;

export default class Viewer extends React.Component {
  static propTypes = {
    cssSelector: PropTypes.string,
    match: PropTypes.shape({
      url: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired,
    pageUrl: PropTypes.string
  };

  renderTabs = tabList =>
    tabList.map(({ url, title }) => {
      return (
        <Tabs.Tab
          key={url}
          onClick={() => this.props.history.push(url)}
          selected={matchPath(this.props.location.pathname, url)}
        >
          {title}
        </Tabs.Tab>
      );
    });

  render() {
    const {
      renderTabs,
      props: {
        match: { url },
        pageUrl,
        cssSelector
      }
    } = this;

    if (!cssSelector) {
      return null;
    }

    return (
      <Popper
        element={document.querySelector(cssSelector)}
        options={{ placement: "right" }}
        render={({ ref }) => (
          <div ref={ref} style={{ zIndex: "999999999" }}>
            <Widget>
              <MainWindow>
                <div>
                  <Logo.Text />
                </div>
                <Grid.Row scale={1}>
                  <Form.Field label="Date Range">
                    <Select>
                      <option>Since last visit</option>
                    </Select>
                  </Form.Field>
                </Grid.Row>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Tabs>
                    {renderTabs([
                      { url: `${url}/thread`, title: "Thread" },
                      { url: `${url}/diff`, title: "Diff" },
                      { url: `${url}/assets`, title: "Assets" }
                    ])}
                  </Tabs>
                  <Switch>
                    <Route path={`${pageUrl}/assets`} component={Assets} />
                    <Route path={`${pageUrl}/diff`} component={Diff} />
                    <Route path={`${pageUrl}/thread`} component={Thread} />
                    <Redirect to={`${url}/thread`} />
                  </Switch>
                </div>
              </MainWindow>
            </Widget>
          </div>
        )}
      />
    );
  }
}
