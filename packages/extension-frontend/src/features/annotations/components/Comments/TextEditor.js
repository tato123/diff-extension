import React from 'react';
import PropTypes from 'prop-types';
import { ic_attach_file as attachFile } from 'react-icons-kit/md/ic_attach_file';
import { ic_send as send } from 'react-icons-kit/md/ic_send';

import styled from 'styled-components';
import { Formik } from 'formik';
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

export default class Editor extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  static defaultProps = {
    loading: false
  };

  onSubmit = values => {
    const {
      props: { onSubmit }
    } = this;
    onSubmit(values.comment, values.file);
  };

  handleAttachImage = () => {
    this.file.click();
  };

  render() {
    const {
      props: { loading },
      onSubmit,
      handleAttachImage
    } = this;

    return (
      <Formik initialValues={{ comment: '', files: [] }} onSubmit={onSubmit}>
        {({ values, handleChange, handleBlur, handleSubmit, setValues }) => (
          <form onSubmit={handleSubmit}>
            <CustomRow>
              <TextArea
                placeholder="Write a comment..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.comment}
                name="comment"
              />

              <IconButton
                icon={attachFile}
                onClick={handleAttachImage}
                type="button"
              >
                <input
                  style={{ visibility: 'hidden', position: 'absolute' }}
                  type="file"
                  name="file"
                  ref={file => {
                    this.file = file;
                  }}
                  onChange={e =>
                    setValues({
                      ...values,
                      [e.currentTarget.name]: [
                        ...(values.file || []),
                        e.currentTarget.files
                      ]
                    })
                  }
                />
              </IconButton>

              <IconButton
                icon={send}
                type="submit"
                loading={loading}
                disabled={values.comment.length === 0}
              />
            </CustomRow>
          </form>
        )}
      </Formik>
    );
  }
}
