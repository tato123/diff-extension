import React from "react";
import PropTypes from "prop-types";
import TextArea from "components/TextArea";
import Button from "components/Button";
import styled from "styled-components";

const AttachmentLabel = styled.label`
  font-size: 12px;
  padding: 8px 0;
  display: block;
`;

const BottomRow = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

export default class Editor extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    onSubmit: () => {},
    ononCancelSubmit: () => {}
  };

  state = {
    textValue: ""
  };

  handleChange = event => {
    this.setState({ textValue: event.target.value });
  };

  handleSubmit = () => {
    this.props.onSubmit({ text: this.state.textValue });
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const {
      state: { textValue },
      props: { onSubmit },
      handleChange,
      handleCancel,
      handleSubmit
    } = this;

    return (
      <div>
        <TextArea rows={5} value={textValue} onChange={handleChange} />
        <AttachmentLabel>No Attachments</AttachmentLabel>

        <BottomRow>
          <a onClick={handleCancel}>cancel</a>
          <Button onClick={handleSubmit}>POST</Button>
        </BottomRow>
      </div>
    );
  }
}
