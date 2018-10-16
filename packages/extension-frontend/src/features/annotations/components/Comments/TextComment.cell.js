import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash-es';

import { DateTime, Placeholder, Space, Image } from '@diff/shared-components';

import styled from 'styled-components';
import User from '../../../../components/User';

const TextCommentCell = styled.div`
  display: block;
  height: 100%;

  &:hover {
    background: var(--df-hover-color-2);
  }
`;

const InnerTextCell = styled.div`
  display: flex;
  flex: 1 auto;
  flex-direction: row;
  line-height: 1;

  padding: var(--df-space-4);

  .title {
    font-size: var(--df-font-sm);
    font-weight: bold;
    color: var(--df-text-color);
    display: block;
  }

  .subheader {
    font-size: var(--df-font-xs);
    color: var(--df-text-color-light);
    display: block;
  }

  .text {
    font-size: var(--df-font-sm-1);
    color: var(--df-text-color);
    display: block;
  }
`;

const CommentCell = ({ item }) => (
  <User id={item.meta.userId}>
    {user => (
      <TextCommentCell key={item.id}>
        <InnerTextCell>
          <Space right={3}>
            {user.picture && <Image avatar small src={user.picture} />}
            {!user.picture && <Placeholder value="Unknown User" />}
          </Space>
          <div>
            <Space bottom={4}>
              <Space bottom={1}>
                <span className="title">{user.name || 'Comment'}</span>
              </Space>
              {item.meta.created && (
                <DateTime date={item.meta.created.toDate()} />
              )}
            </Space>
            <span className="text">{item.comment}</span>
          </div>
        </InnerTextCell>
      </TextCommentCell>
    )}
  </User>
);

CommentCell.propTypes = {
  item: PropTypes.object.isRequired
};

export default CommentCell;
