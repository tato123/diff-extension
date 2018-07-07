import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Button, TextArea, Label, Grid } from "@diff/shared-components";

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
  height: 200px;
  max-height: 200px;
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

    console.log("trying to display editor");

    return (
      <Container>
        <TextArea rows={5} value={textValue} onChange={handleChange} />
        <Label>No Attachments</Label>

        <BottomRow>
          <Button.Flat onClick={handleCancel}>cancel</Button.Flat>
          <Button onClick={handleSubmit}>POST</Button>
        </BottomRow>
      </Container>
    );
  }
}
