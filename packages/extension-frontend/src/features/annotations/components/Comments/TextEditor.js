import React from 'react';
import { ic_attach_file as attachFile } from 'react-icons-kit/md/ic_attach_file';
import { ic_send as send } from 'react-icons-kit/md/ic_send';

import styled from 'styled-components';
import IconButton from '../../../../components/IconButton';
import Row from '../Row';

const CustomRow = styled(Row)`
  display: grid;
  grid-template-areas: '. . .';
  grid-template-columns: 1fr 32px 32px;
  grid-template-rows: 1fr;
  height: 100%;
  padding: 16px;
`;

const TextArea = styled.textarea`
  outline: none;
  border: none;

  display: flex;
  resize: none;
`;

const Editor = () => (
  <CustomRow>
    <TextArea placeholder="Write a comment..." />

    <IconButton icon={attachFile} />
    <IconButton icon={send} />
  </CustomRow>
);

export default Editor;
