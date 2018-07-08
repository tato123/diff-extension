import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Editor from "components/Editor";
import { Switch, Route } from "react-router";
import { Button } from "@diff/shared-components";
import Comments from "components/Comments";

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

export default class Thread extends React.Component {
  static propTypes = {
    cssSelector: PropTypes.string,
    navigateTo: PropTypes.func.isRequired,
    basePath: PropTypes.string.isRequired,
    currentUrl: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired
  };

  onAddCommentButtonClick = () => {
    this.props.navigateTo(`${this.props.currentUrl}/add`);
  };

  handleEditorSubmit = vals => {
    debugger;
    this.props.addComment({ ...vals, selector: this.props.cssSelector });
  };

  handleEditorCancel = () => {
    this.props.navigateTo(this.props.currentUrl);
  };

  renderEditor = () => {
    return (
      <Switch>
        <Route
          path={`/selectors/:id/window/thread/add`}
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
              <Button onClick={this.onAddCommentButtonClick}>
                
                + Add Comment
              </Button>
            </div>
          )}
        />
      </Switch>
    );
  };

  render() {
    const {
      props: { cssSelector }
    } = this;

    return (
      <ThreadContainer>
        <HeadArea gridArea="head">{this.renderEditor()}</HeadArea>
        <GridArea
          gridArea="thread"
          style={{
            overflow: "auto",
            flex: 1,
            width: "calc(100% + 23px)"
          }}
        >
          <div style={{ width: "calc(100% - 23px)" }}>
            <Comments thread={cssSelector} />
          </div>
        </GridArea>
      </ThreadContainer>
    );
  }
}
