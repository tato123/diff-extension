import React from "react";
import PropTypes from "prop-types";
import { Form, Logo, Select, Tabs, Tab, Anchor } from "@diff/shared-components";

import styled from "styled-components";
import Popper from "components/Popper";
import Assets from "./components/AssetsTab";
import Diff from "./components/DiffTab";
import Thread from "./components/ThreadTab";
import Draggable from "react-draggable";

import Icon from "react-icons-kit";
import { ic_close as iconClose } from "react-icons-kit/md/ic_close";

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

const TitleBar = styled.div`
  display: flex;
  height: 24px;
  min-height: 24px;
  max-height: 24px;
  justify-content: space-between;
  margin-bottom: 16px;

  img {
    user-select: none;
  }
`;

const SelectRegion = styled.div`
  height: 64px;
  min-height: 64px;
  max-height: 64px;
  margin-bottom: 16px;
`;

export default class DiffViewer extends React.Component {
  static propTypes = {
    /**
     * Element selector that we are currently displaying
     * diff for
     */
    cssSelector: PropTypes.string,
    /**
     * Callback function to handle closing diff
     */
    close: PropTypes.func.isRequired,
    /**
     * All of the ids that are currently visible
     */
    visibleIds: PropTypes.array,
    /**
     * Record all of the items we have looked at so far
     */
    updateItemsSeen: PropTypes.func.isRequired
  };

  state = {
    selectedTab: "thread"
  };

  componentDidMount() {
    setTimeout(() => {
      const {
        props: { visibleIds, updateItemsSeen }
      } = this;
      updateItemsSeen(visibleIds);
    }, 2000);
  }

  close = () => {
    this.props.close(this.props.cssSelector);
  };

  handleChange = (val, old, clazz) => {
    console.log(val);
    this.setState({ selectedTab: val });
  };

  render() {
    const {
      props: { cssSelector },
      state: { selectedTab }
    } = this;

    if (!cssSelector) {
      return null;
    }
    const options = {
      placement: "auto",
      modifiers: {
        preventOverflow: {
          enabled: true,
          boundariesElement: "viewport"
        }
      }
    };

    return (
      <Popper
        element={cssSelector}
        options={options}
        render={({ ref }) => (
          <div ref={ref}>
            <Draggable handle=".handle">
              <MainWindow>
                <TitleBar className="handle">
                  <div>
                    <Logo.Text />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Anchor onClick={this.close}>
                      <Icon icon={iconClose} />
                    </Anchor>
                  </div>
                </TitleBar>
                <SelectRegion>
                  <Form.Field label="Date Range">
                    <Select>
                      <option>Since last visit</option>
                    </Select>
                  </Form.Field>
                </SelectRegion>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Tabs
                    selectedTabId={selectedTab}
                    onChange={this.handleChange}
                  >
                    <Tab
                      id="thread"
                      title="Thread"
                      panel={<Thread cssSelector={cssSelector} />}
                    />
                    <Tab id="diff" title="Diff" panel={<Diff />} />
                    <Tab id="assets" title="Assets" panel={<Assets />} />
                    <Tabs.Expander />
                  </Tabs>
                </div>
              </MainWindow>
            </Draggable>
          </div>
        )}
      />
    );
  }
}
