import React from "react";
import PropTypes from "prop-types";
import {
  StyleBoundary,
  Form,
  Logo,
  Select,
  Tabs,
  Grid,
  Anchor
} from "@diff/shared-components";

import styled from "styled-components";
import Popper from "components/Popper";
import { Assets, Diff, Thread } from "./components/Tabs";
import Icon from "react-icons-kit";
import { ic_close } from "react-icons-kit/md/ic_close";

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
    close: PropTypes.func.isRequired
  };

  state = {
    selectedTab: 0
  };

  onTabClick = val => () => {
    this.setState({ selectedTab: val });
  };

  renderTabs = tabList =>
    tabList.map(({ title }, idx) => {
      return (
        <Tabs.Tab
          key={idx}
          onClick={this.onTabClick(idx)}
          selected={this.state.selectedTab === idx}
        >
          {title}
        </Tabs.Tab>
      );
    });

  close = () => {
    this.props.close();
  };

  render() {
    const {
      renderTabs,
      props: { cssSelector },
      state: { selectedTab }
    } = this;

    if (!cssSelector) {
      return null;
    }

    return (
      <Popper
        element={cssSelector}
        options={{ placement: "right" }}
        render={({ ref }) => (
          <div ref={ref} style={{ zIndex: "999999999" }}>
            <StyleBoundary>
              <MainWindow>
                <div
                  style={{
                    display: "flex",
                    height: "24px",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <Logo.Text />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Anchor onClick={this.close}>
                      <Icon icon={ic_close} />
                    </Anchor>
                  </div>
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
                      { title: "Thread" },
                      { title: "Diff" },
                      { title: "Assets" }
                    ])}
                  </Tabs>
                  {selectedTab === 0 && <Thread cssSelector={cssSelector} />}
                  {selectedTab === 1 && <Diff />}
                  {selectedTab === 2 && <Assets />}
                </div>
              </MainWindow>
            </StyleBoundary>
          </div>
        )}
      />
    );
  }
}
