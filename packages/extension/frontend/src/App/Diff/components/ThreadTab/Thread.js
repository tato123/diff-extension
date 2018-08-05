import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Editor from "./Editor";
import { Button } from "@diff/shared-components";
import ThreadCell from "../ThreadCell";

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
    cssSelector: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    addComment: PropTypes.func.isRequired
  };

  state = {
    addComment: false
  };

  onAddCommentButtonClick = () => {
    this.setState({ addComment: true });
  };

  handleEditorSubmit = vals => {
    this.props.addComment({ ...vals, selector: this.props.cssSelector });
    this.setState({ addComment: false });
  };

  handleEditorCancel = () => {
    this.setState({ addComment: false });
  };

  renderEditor = () => {
    if (this.state.addComment) {
      return (
        <Editor
          onSubmit={this.handleEditorSubmit}
          onCancel={this.handleEditorCancel}
        />
      );
    }

    return (
      <div className="centered">
        <Button onClick={this.onAddCommentButtonClick}>+ Add Comment</Button>
      </div>
    );
  };

  render() {
    const {
      props: { cssSelector }
    } = this;

    console.log("my css selector", cssSelector);
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
            <ThreadCell thread={cssSelector} />
          </div>
        </GridArea>
      </ThreadContainer>
    );
  }
}
