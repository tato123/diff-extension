import React from "react";
import PropTypes from "prop-types";
import MainWindow from "./styles/MainWindow";
import Widget from "components/Widget";
import logo from "assets/diff-logo_24.png";
import Label from "components/Label";
import Select from "components/Select";
import Tabs from "components/Tabs";
import Thread from "./Thread";
import Button from "components/Button";
import styled from "styled-components";

/* prettier-ignore */
const ThreadContainer = styled.div`
  display: grid;
  grid-template-areas:
    "head"
    "thread";
  height: 100%;
  grid-auto-rows: min-content;
`;

const GridArea = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
`;

export default class Viewer extends React.Component {
  state = {
    selectedTab: 1
  };

  onTabClick = val => () => {
    this.setState({ selectedTab: val });
  };

  renderThread = thread => (
    <ThreadContainer>
      <GridArea gridArea="head" style={{ justifySelf: "center" }}>
        <Button icon="plus">Add Comment</Button>
      </GridArea>
      <GridArea gridArea="thread">
        <Thread thread={thread} />
      </GridArea>
    </ThreadContainer>
  );

  showDiffs = () => <div> Diff - Nothing to show</div>;

  showAssets = () => <div> Assets - Nothing to show</div>;

  render() {
    const {
      onTabClick,
      showDiffs,
      showAssets,
      renderThread,
      state: { selectedTab }
    } = this;

    const thread = this.props.match.params.id;

    return (
      <Widget>
        <MainWindow>
          <div>
            <img src={logo} />
          </div>
          <div>
            <Label.Small>Date Range</Label.Small>
            <Select>
              <option>Since last visit</option>
            </Select>
          </div>
          <div>
            <Tabs>
              <Tabs.Tab onClick={onTabClick(1)} selected={selectedTab === 1}>
                Thread
              </Tabs.Tab>
              <Tabs.Tab onClick={onTabClick(2)} selected={selectedTab === 2}>
                Diff view
              </Tabs.Tab>
              <Tabs.Tab onClick={onTabClick(3)} selected={selectedTab === 3}>
                Assets
              </Tabs.Tab>
            </Tabs>

            {selectedTab === 1 && this.renderThread(thread)}
            {selectedTab === 2 && showDiffs()}
            {selectedTab === 3 && showAssets()}
          </div>
        </MainWindow>
      </Widget>
    );
  }
}
