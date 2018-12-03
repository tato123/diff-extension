import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash-es';
import { Icon } from 'react-icons-kit';
import { ic_attach_file as attachFile } from 'react-icons-kit/md/ic_attach_file';

import { DateTime, Placeholder, Space, Image } from '@diff/shared-components';

import styled from 'styled-components';
import User from '../../../../components/User';

const TextCommentCell = styled.div`
  display: block;

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

const Attachment = styled.a`
  font-size: 12px;
  background-color: var(--df-text-color-highlight);
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
  text-decoration: none;
  display: inline-block;
  margin-top: 6px;
  margin-right: 8px;
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

            {item.attachments.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flex: '1 auto',
                  flexWrap: 'wrap'
                }}
              >
                {item.attachments.map(attach => (
                  <Attachment
                    href={attach.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Space right={1} style={{ display: 'inline-block' }}>
                      <Icon icon={attachFile} size={14} />
                    </Space>
                    {attach.name}
                  </Attachment>
                ))}
              </div>
            )}
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
