import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";
import Attachment from "components/Attachment";
import { List, Image, Code, DateTime } from "@diff/shared-components";

export default class Comments extends React.Component {
  static propTypes = {
    thread: PropTypes.array,
    users: PropTypes.any
  };

  static defaultProps = {
    thread: [],
    users: {}
  };

  renderDiff = (item, idx) => (
    <List.Item data={item} key={item.id}>
      <Image
        avatar
        src={_.get(this.props.users, `${[item.meta.userId]}.photoUrl`)}
      />
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
      <Image
        avatar
        src={_.get(this.props.users, `${[item.meta.userId]}.photoUrl`)}
      />
      <List.Content>
        <List.Header>Comment</List.Header>
        <List.SubHeader>
          <DateTime date={item.meta.created} />
        </List.SubHeader>
        <List.Description>
          <div>
            {item.comment}
            {item.attachments &&
              item.attachments.map(file => (
                <Attachment key={file.url} name={file.name} url={file.url} />
              ))}
          </div>
        </List.Description>
      </List.Content>
    </List.Item>
  );

  render() {
    const {
      props: { thread }
    } = this;

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
