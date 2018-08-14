import React from "react";
import PropTypes from "prop-types";
import { Keyframes, animated, config } from "react-spring";
import styled from "styled-components";
import Modal from "./components/Modal";
import {
  StyleBoundary,
  Form,
  Button,
  Header,
  HR,
  Logo
} from "@diff/shared-components";
import { Formik } from "formik";
import { string, object } from "yup";

const FORM_TYPES = {
  LOGIN: "login",
  PRECHECK: "precheck",
  SIGNUP: "signup"
};

// prettier-ignore
const Container = styled.div`
  position: absolute;
  z-index: 1;
  will-change: transform, opacity;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "."
    "."
    "."
    ".";
  grid-template-rows: 24px 64px 1fr auto;
  grid-template-columns: 100%;
  grid-gap: 8px;
  min-height: 100%;
  padding: 20px;
    
  > div:last-child {
    flex: 0 0 100px;
    justify-content: space-between;
    display: flex;
  }
`;

const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};

const ModalContainer = Keyframes.Spring({
  [FORM_TYPES.SIGNUP]: { to: { height: 450 }, config: fast },
  [FORM_TYPES.PRECHECK]: { delay: 150, to: { height: 280 }, config: fast }
});

const Content = Keyframes.Trail({
  [FORM_TYPES.SIGNUP]: {
    to: { y: 0, opacity: 1 }
  },
  [FORM_TYPES.PRECHECK]: { to: { y: -32, opacity: 0 } }
});

/**
 * Login widget handles our authentication lifecycle, both
 * checking whether a user is currently logged in and as a result
 * allowing us to login or create a new account if they are not
 *
 * @returns {React.Component}
 */
export default class Login extends React.Component {
  static propTypes = {
    /**
     * Action handler for logging in, should
     * return a promise
     */
    login: PropTypes.func.isRequired,
    /**
     * Action handler for signing up a new user
     */
    signup: PropTypes.func.isRequired,
    /**
     * Getter to fetch our cache token
     */
    getCacheToken: PropTypes.func.isRequired,
    /**
     * Validates whether we can use an email
     */
    validateEmail: PropTypes.func.isRequired
  };

  state = {
    requiresLogin: false,
    form: FORM_TYPES.PRECHECK,
    formFields: FORM_TYPES.PRECHECK
  };

  async componentDidMount() {
    try {
      const refreshToken = await this.props.getCacheToken();

      if (refreshToken) {
        await this.props.login({ refreshToken });
      } else {
        this.setState({ requiresLogin: true });
      }
    } catch (err) {
      this.setState({ requiresLogin: true });
    }
  }

  onLoginRequest = evt => {
    evt.preventDefault();
    const username = evt.target.user.value;
    const password = evt.target.password.value;
    return this.props.login({ username, password });
  };

  onSignup = evt => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    return this.props
      .signup(email, password)
      .then(refreshToken => {
        return this.props.login({ refreshToken });
      })
      .catch(err => {
        console.error("Error occured signing up", err);
      });
  };

  showForm = formType => () => {
    // delay setting for the form fields
    // type to accomodate the animating fields
    // in and out
    this.showFormFields(formType);

    // change our form dynamically
    this.setState({
      form: formType
    });
  };

  showFormFields = formType => {
    if (formType === FORM_TYPES.PRECHECK) {
      setTimeout(() => {
        this.setState({
          formFields: formType
        });
      }, 100);
    } else if (formType === FORM_TYPES.SIGNUP) {
      this.setState({
        formFields: formType
      });
    }
  };

  formFields = () => {
    switch (this.state.formFields) {
      case FORM_TYPES.LOGIN:
        return [
          {
            key: 0,
            type: "password",
            label: "Password",
            name: "password",
            required: true,
            autoComplete: "off"
          }
        ];
      case FORM_TYPES.SIGNUP:
        return [
          {
            key: 0,
            type: "password",
            label: "Password",
            name: "password",
            required: true,
            autoComplete: "off"
          },
          {
            key: 1,
            type: "text",
            label: "Username",
            name: "username",
            autoComplete: "off"
          }
        ];
      case FORM_TYPES.PRECHECK:
      default:
        return [];
    }
  };

  getValidationSchema = () => {
    switch (this.state.form) {
      case FORM_TYPES.PRECHECK:
        return object().shape({
          email: string()
            .email()
            .required()
        });
      case FORM_TYPES.LOGIN:
      case FORM_TYPES.SIGNUP:
        return object().shape({
          email: string()
            .email()
            .required(),
          password: string().required()
        });
    }
  };

  submitForm = (values, { setSubmitting, setErrors }) => {
    if (this.state.form === FORM_TYPES.PRECHECK) {
      console.log("submitting login form");
      setSubmitting(true);
      this.props
        .validateEmail(values.email)
        .then(() => {
          setSubmitting(false);
          // is an email
          console.log("already have this email");
        })
        .catch(err => {
          setSubmitting(false);
          this.showForm("signup")();
        });

      return;
    }

    if (this.state.form === FORM_TYPES.SIGNUP) {
      setSubmitting(false);
      console.log("Signing up");
      setSubmitting(true);
      return this.props
        .signup(values.email, values.password)
        .then(successAction => {
          this.props.login({
            refreshToken: successAction.payload.refreshToken.refresh_token
          });
          setSubmitting(false);
        })
        .catch(err => {
          setSubmitting(false);
          setErrors(err);
        });
    }
  };

  render() {
    const {
      state: { requiresLogin, form }
    } = this;

    if (requiresLogin) {
      return (
        <Modal>
          <StyleBoundary>
            <ModalContainer state={form}>
              {({ height }) => (
                <animated.div style={{ height: height }}>
                  <Modal.Content id="login-modal">
                    <Formik
                      initialValues={{ email: "", password: "", username: "" }}
                      validationSchema={this.getValidationSchema()}
                      onSubmit={this.submitForm}
                      render={({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <Container>
                            <div>
                              <Logo.Text />
                            </div>
                            <div>
                              <Header as="h3">Signin with your email</Header>
                              <HR />
                            </div>
                            <div>
                              <Form.Input
                                type="text"
                                name="email"
                                label="Email"
                                error={touched.email && errors.email}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                autoFocus
                                autoComplete="off"
                              />

                              <Content
                                native
                                config={{ tension: 200, friction: 20 }}
                                state={form}
                                keys={this.formFields().map(item => item.key)}
                              >
                                {this.formFields().map(
                                  (item, idx) => ({ y, opacity }) => (
                                    <animated.div
                                      style={{
                                        opacity,
                                        transform: y.interpolate(
                                          y => `translate3d(0, ${y}px, 0`
                                        )
                                      }}
                                    >
                                      <Form.Input
                                        {...item}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={touched[item.name] && item.name}
                                        error={errors[item.name]}
                                        value={values[item.name]}
                                      />
                                    </animated.div>
                                  )
                                )}
                              </Content>
                            </div>
                            <div>
                              <Button.Flat
                                type="button"
                                onClick={this.showForm(
                                  form !== FORM_TYPES.SIGNUP
                                    ? FORM_TYPES.SIGNUP
                                    : FORM_TYPES.PRECHECK
                                )}
                              >
                                {form !== FORM_TYPES.SIGNUP
                                  ? "Create Account"
                                  : "Login"}
                              </Button.Flat>
                              <Button
                                type="submit"
                                primary
                                disabled={
                                  isSubmitting || Object.keys(errors).length > 0
                                }
                                loading={isSubmitting}
                              >
                                {form === FORM_TYPES.PRECHECK && "Next"}
                                {form === FORM_TYPES.SIGNUP && "Create Account"}
                              </Button>
                            </div>
                          </Container>
                        </form>
                      )}
                    />
                  </Modal.Content>
                </animated.div>
              )}
            </ModalContainer>
          </StyleBoundary>
        </Modal>
      );
    }
    return null;
  }
}
