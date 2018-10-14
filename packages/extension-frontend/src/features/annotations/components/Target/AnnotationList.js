import React from 'react';
import PropTypes from 'prop-types';
import { Space } from '@diff/shared-components';
import { Icon } from 'react-icons-kit';
import { ic_mode_comment as commentIcon } from 'react-icons-kit/md/ic_mode_comment';
import styled from 'styled-components';
import ItemRow from './ItemRow';

const StretchyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  overflow: auto;
`;

const TargetRow = ({ annotations, onClick, innerRef }) => (
  <StretchyContainer innerRef={innerRef}>
    {annotations.map(annotation => (
      <ItemRow
        className="annotation"
        key={encodeURIComponent(annotation)}
        onClick={onClick(annotation)}
      >
        <span className="annotation-id">{annotation}</span>
        <div className="tags">
          <Space right={1}>
            <span>0</span>
          </Space>
          <Icon icon={commentIcon} />
        </div>
      </ItemRow>
    ))}
  </StretchyContainer>
);

TargetRow.propTypes = {
  annotations: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TargetRow;
