import React from "react";
import MainWindow from "./styles/MainWindow";
import Widget from "components/Widget";
import logo from "assets/diff-logo_24.png";
import Label from "components/Label";
import Select from "components/Select";
import Tabs from "components/Tabs";

export default class Viewer extends React.Component {
  state = {
    selectedTab: 1
  };

  onTabClick = val => () => {
    this.setState({ selectedTab: val });
  };

  render() {
    const {
      onTabClick,
      state: { selectedTab }
    } = this;

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
          </div>
        </MainWindow>
      </Widget>
    );
  }
}
