import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Header } from "@diff/shared-components";
import styled from "styled-components";

const Space = styled.span`
  margin-top: 16px;
  display: flex;
  flex: 1 auto;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  > button:last-child {
    width: 70%;
  }
`;

const Container = styled.div`
  position: absolute;
  will-change: transform, opacity;
  width: calc(100% - 45px);
  height: 100%;
  z-index: 20;
`;

export default class CredentialForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  state = {
    loading: false
  };

  handleOnSubmit = evt => {
    this.setState({
      loading: true
    });
    this.props.onSubmit(evt).catch(() => {
      this.setState({
        loading: false
      });
    });
  };

  render() {
    const {
      handleOnSubmit,
      props: { style, onCancel },
      state: { loading }
    } = this;

    return (
      <Container style={style}>
        <Header as="h4">Signup</Header>
        <Form onSubmit={handleOnSubmit} autoComplete="off">
          <Form.Input
            label="Username"
            name="user"
            type="text"
            placeholder="email@domain.com"
          />
          <Form.Input
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Form.Input
            label="Confirm Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Space>
            <Button onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button loading={loading} type="submit" disabled>
              Create Account
            </Button>
          </Space>
        </Form>
      </Container>
    );
  }
}
