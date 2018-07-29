import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Header, Anchor, HR } from "@diff/shared-components";
import styled from "styled-components";

const LoginButton = styled(Button)`
  margin-top: 16px !important;
`;

const Container = styled.div`
  position: absolute;
  z-index: 1;
  will-change: transform, opacity;
  width: calc(100% - 45px);
  height: 100%;
`;

export default class CredentialForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSignup: PropTypes.func.isRequired,
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
      props: { onSignup, style },
      state: { loading }
    } = this;

    return (
      <Container style={style}>
        <Header as="h4">Login</Header>
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
          <LoginButton loading={loading} type="submit">
            Submit
          </LoginButton>
        </Form>
        <HR />
        {"Don't have an account?"}{" "}
        <Anchor onClick={onSignup}>Create one now</Anchor>
      </Container>
    );
  }
}
