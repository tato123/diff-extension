import React from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import styled from "styled-components";

const Comment = styled.p`
  font-size: 12px;
`;

const TypeMarker = styled.label`
  font-size: 12px;
  display: block;
  text-transform: uppercase;
  height: 12px;
  margin: 0;
  padding: 0;
`;

const DiffFrom = styled.label`
  color: #22b573;
  font-size: 10px;
`;

const DiffTo = styled.label`
  color: #ef3b7b;
  font-size: 10px;
`;

export default class Thread extends React.Component {
  static propTypes = {
    thread: PropTypes.array
  };

  static defaultProps = {
    thread: []
  };

  renderDiff = (item, idx) => (
    <Content data={item}>
      <div>
        <TypeMarker>{item.diffType}</TypeMarker>
        <DiffFrom>{item.diff.from}</DiffFrom>
        <DiffTo>{item.diff.to}</DiffTo>
      </div>
    </Content>
  );

  renderComment = (item, idx) => (
    <Content data={item}>
      <Comment>{item.comment}</Comment>
    </Content>
  );

  render() {
    const {
      props: { thread }
    } = this;

    if (thread.length === 0) {
      return <div> Thread - Nothing to show</div>;
    }

    return thread.map((item, idx) => {
      if (item.type === "diff") {
        return this.renderDiff(item, idx);
      } else if (item.type === "comment") {
        return this.renderComment(item, idx);
      }
      return null;
    });
  }
}
