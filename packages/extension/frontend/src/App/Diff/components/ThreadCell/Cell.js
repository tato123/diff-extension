import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import Attachment from "../Attachment";
import { List, Image, Code, DateTime } from "@diff/shared-components";

import styled from "styled-components";

const AttachmentContainer = styled.div`
  > div:first-child {
    margin-top: 16px;
  }

  > div:last-child {
    margin-bottom: 8px;
  }
`;

export default class Comments extends React.Component {
  static propTypes = {
    thread: PropTypes.array,
    users: PropTypes.any,
    isNew: PropTypes.func.isRequired
  };

  static defaultProps = {
    thread: [],
    users: {}
  };

  NON_USER_ID = "system";

  renderDiff = (item, idx) => (
    <List.Item data={item} key={item.id}>
      <Image
        avatar={item.meta.userId !== this.NON_USER_ID}
        small
        src={_.get(this.props.users, `${[item.meta.userId]}.photoUrl`)}
      />
      <List.Content>
        <List.Header new={this.props.isNew(item.id)}>Diff</List.Header>
        <List.SubHeader>
          <DateTime date={item.meta.created} />
        </List.SubHeader>
        <List.Description>
          <Code label={item.diffType.toUpperCase()}>
            <Code.PropertyList
              properties={[
                {
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
        small
        avatar={item.meta.userId !== this.NON_USER_ID}
        src={_.get(this.props.users, `${[item.meta.userId]}.photoUrl`)}
      />
      <List.Content>
        <List.Header new={this.props.isNew(item.id)}>Comment</List.Header>
        <List.SubHeader>
          <DateTime date={item.meta.created} />
        </List.SubHeader>
        <List.Description>
          <AttachmentContainer>
            {item.comment}
            {item.attachments &&
              item.attachments.map(file => (
                <Attachment key={file.url} name={file.name} url={file.url} />
              ))}
          </AttachmentContainer>
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
