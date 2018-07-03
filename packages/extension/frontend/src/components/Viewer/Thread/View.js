// @flow

import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

import { Label, List, Image, Code } from "@diff/shared-components";

const DateTime = ({ date }) => (
  <div>
    <Label as="overline">
      {date && format(date, "dddd, MMM D, YYYY - h:mm A")}
    </Label>
  </div>
);

DateTime.propTypes = {
  date: PropTypes.object
};

export default class Thread extends React.Component {
  static propTypes = {
    thread: PropTypes.array
  };

  static defaultProps = {
    thread: []
  };

  renderDiff = (item, idx) => (
    <List.Item data={item} key={item.id}>
      <Image avatar src="https://d3iw72m71ie81c.cloudfront.net/male-20.jpg" />
      <List.Content>
        <List.Header>Diff</List.Header>
        <List.SubHeader>
          <DateTime date={item.meta.created} />
        </List.SubHeader>
        <List.Description>
          <Code label="CSS">
            <Code.PropertyList
              properties={[
                {
                  name: item.diffType,
                  from: item.diff.from,
                  to: item.diff.to
                }
              ]}
            />
          </Code>
        </List.Description>
      </List.Content>
    </List.Item>
  );

  renderComment = (item, idx) => (
    <List.Item data={item} key={item.id}>
      <Image avatar src="https://d3iw72m71ie81c.cloudfront.net/male-20.jpg" />
      <List.Content>
        <List.Header>Comment</List.Header>
        <List.SubHeader>
          <DateTime date={item.meta.created} />
        </List.SubHeader>
        <List.Description>{item.comment}</List.Description>
      </List.Content>
    </List.Item>
  );

  render() {
    const {
      props: { thread }
    } = this;

    if (thread.length === 0) {
      return <div> Thread - Nothing to show</div>;
    }

    return (
      <List>
        {thread.map((item, idx) => {
          if (item.type === "diff") {
            return this.renderDiff(item, idx);
          } else if (item.type === "comment") {
            return this.renderComment(item, idx);
          }
        })}
      </List>
    );
  }
}
