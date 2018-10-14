import React from 'react';
import PropTypes from 'prop-types';

import { List, DateTime, Placeholder } from '@diff/shared-components';

import styled from 'styled-components';

const AttachmentContainer = styled.div`
  > div:first-child {
    margin-top: 16px;
  }
  > div:last-child {
    margin-bottom: 8px;
  }
`;

const CommentCell = ({ item }) => (
  <List.Item data={item} key={item.id}>
    <Placeholder value="Unknown User" />

    <List.Content>
      <List.Header>Comment</List.Header>
      <List.SubHeader>
        <DateTime date={item.meta.created.seconds} />
      </List.SubHeader>
      <List.Description>
        <AttachmentContainer>
          {item.comment}
          {item.attachments &&
            item.attachments.map(file => <span>{file.name}</span>)}
        </AttachmentContainer>
      </List.Description>
    </List.Content>
  </List.Item>
);

CommentCell.propTypes = {
  item: PropTypes.object.isRequired
};

export default CommentCell;
