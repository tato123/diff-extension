import React from "react";
import PropTypes from "prop-types";
import MainWindow from "../styles/MainWindow";
import {
  Widget,
  Form,
  Button,
  Logo,
  Select,
  Tabs,
  Grid
} from "@diff/shared-components";

import Thread from "../Thread";
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
      <GridArea
        gridArea="thread"
        style={{
          overflow: "auto",
          flex: 1,
          width: "calc(100% + 23px)"
        }}
      >
        <div style={{ width: "calc(100% - 23px)" }}>
          <Thread thread={thread} />
        </div>
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
      state: { selectedTab }
    } = this;

    const thread = this.props.match.params.id;

    return (
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
