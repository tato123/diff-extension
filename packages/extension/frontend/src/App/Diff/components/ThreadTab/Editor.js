import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, TextArea, Label, Grid } from "@diff/shared-components";
import Icon from "react-icons-kit";
import { paperclip } from "react-icons-kit/fa/paperclip";
import Attachment from "../Attachment";
const BottomRow = styled(Grid.Row)`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: block;
  flex-direction: column;
  flex: 1;
  min-height: 200px;
`;

/**
 * Editor handles the creation of new comment data
 * and attachments
 */
export default class Editor extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    onSubmit: () => {},
    onCancel: () => {}
  };

  state = {
    textValue: "",
    attachments: []
  };

  /**
   * Comment text area state
   */
  handleChange = event => {
    console.log("change occuring");
    this.setState({ textValue: event.target.value });
  };

  /**
   * Submits to callback function with our state data
   */
  handleSubmit = () => {
    this.props.onSubmit({
      comment: this.state.textValue,
      attachments: this.state.attachments
    });
  };

  handleAttachImage = () => {
    this.file.click();
  };

  handleImageAdded = evt => {
    /*eslint-disable */
    const [file] = evt.target.files;

    this.setState(state => ({
      attachments: [...state.attachments, file]
    }));
  };

  render() {
    const {
      state: { textValue, attachments },
      props: { onCancel },
      handleChange,
      handleSubmit,
      handleAttachImage,
      handleImageAdded
    } = this;

    return (
      <Container>
        <TextArea rows={5} value={textValue} onChange={handleChange} />
        {attachments.length === 0 && <Label>No Attachments</Label>}
        {attachments.length > 0 &&
          attachments.map(({ name }) => <Attachment name={name} />)}

        <BottomRow>
          <Button.Flat onClick={onCancel}>cancel</Button.Flat>
          <div style={{ display: "flex" }}>
            <Button
              style={{ marginRight: "8px" }}
              for="file"
              onClick={handleAttachImage}
            >
              <Icon icon={paperclip} />
            </Button>
            <input
              style={{ visibility: "hidden", position: "absolute" }}
              type="file"
              name="file"
              ref={file => (this.file = file)}
              onChange={handleImageAdded}
            />

            <Button onClick={handleSubmit} type="submit">
              POST
            </Button>
          </div>
        </BottomRow>
      </Container>
    );
  }
}
