import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Header,
  Anchor,
  HR,
  Logo
} from "@diff/shared-components";
import styled from "styled-components";

// prettier-ignore
const Container = styled.div`
  position: absolute;
  z-index: 1;
  will-change: transform, opacity;
  width: calc(100% - 45px);
  height: 100%;
  display: grid;
  grid-template-areas:
    "header"
    "body";
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
        <div>
          <Logo.Text />
          <Header as="h2" uppercase>
            Sign in
          </Header>
          <p>with your Diff Account</p>
        </div>
        <Form onSubmit={handleOnSubmit} autoComplete="off">
          <Form.Input
            label="Email"
            name="user"
            type="text"
            placeholder="email@domain.com"
          />
          <div style={{ display: "flex" }}>
            <Button.Flat>Create Account</Button.Flat>
            <Button primary loading={loading} type="submit">
              Next
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}
