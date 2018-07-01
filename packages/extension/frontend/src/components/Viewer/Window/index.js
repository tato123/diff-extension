import React from "react";
import PropTypes from "prop-types";
import MainWindow from "../styles/MainWindow";
import Widget from "components/Widget";
import logo from "assets/diff-logo_24.png";
import Label from "@diff/shared-components";
import Select from "components/Select";
import Tabs from "components/Tabs";
import Thread from "../Thread";
import Button from "components/Button";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import Editor from "../Editor";

/* prettier-ignore */
const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  
`;

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HeadArea = styled.div`
  margin: 16px 0;

  .centered {
    justify-content: center;
    display: flex;
  }
`;

const DateChooser = styled.div`
  label {
    text-transform: uppercase;
    font-weight: 200 !important;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    display: block;
    margin: 0;
    padding: 0;
    margin-bottom: 8px;
  }
`;

export default class Viewer extends React.Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired
  };
  state = {
    selectedTab: 1
  };

  onTabClick = val => () => {
    this.setState({ selectedTab: val });
  };

  onAddCommentClick = () => {
    const thread = this.props.match.params.id;
    this.props.history.push(`/selectors/${thread}/addComment`);
  };

  handleEditorSubmit = vals => {
    console.log("calling handle editor submit");
    this.props.addComment({ ...vals, selector: this.props.match.params.id });
  };

  handleEditorCancel = () => {
    this.props.history.push(`/selectors/${this.props.match.params.id}`);
  };

  renderThread = thread => (
    <ThreadContainer>
      <HeadArea gridArea="head">
        <Switch>
          <Route
            path="/selectors/:id/addComment"
            render={() => (
              <Editor
                onSubmit={this.handleEditorSubmit}
                onCancel={this.handleEditorCancel}
              />
            )}
          />
          <Route
            render={() => (
              <div className="centered">
                <Button icon="plus" onClick={this.onAddCommentClick}>
                  Add Comment
                </Button>
              </div>
            )}
          />
        </Switch>
      </HeadArea>
      <GridArea gridArea="thread" style={{ overflow: "auto", flex: 1 }}>
        <Thread thread={thread} />
      </GridArea>
    </ThreadContainer>
  );

  showDiffs = () => <div> Diff - Nothing to show</div>;

  showAssets = () => <div> Assets - Nothing to show</div>;

  onCreatePost = (content, imageId) => {
    console.log("asking to post", content);
  };

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
          <DateChooser>
            <Label.Small>Date Range</Label.Small>
            <Select>
              <option>Since last visit</option>
            </Select>
          </DateChooser>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
