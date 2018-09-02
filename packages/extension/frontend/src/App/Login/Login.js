import React from "react";
import PropTypes from "prop-types";
import { Keyframes, animated, config } from "react-spring";
import styled from "styled-components";
import Modal from "./components/Modal";
import { Form, Button, Header, HR, Logo, Label } from "@diff/shared-components";
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

const ErrorLabel = styled(Label)`
  color: #c51162;
  margin: 4px 0px 0px 0px !important;
  font-size: 16px;
  padding-bottom: 0px;
  top: -8px;
  position: relative;
`;

const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};

const ModalContainer = Keyframes.Spring({
  [FORM_TYPES.SIGNUP]: { to: { height: 450 }, config: fast },
  [FORM_TYPES.LOGIN]: { to: { height: 360 }, config: fast },
  [FORM_TYPES.PRECHECK]: { delay: 150, to: { height: 280 }, config: fast }
});

const Content = Keyframes.Trail({
  [FORM_TYPES.SIGNUP]: {
    to: { y: 0, opacity: 1 }
  },
  [FORM_TYPES.LOGIN]: {
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
    validateEmail: PropTypes.func.isRequired,

    refreshToken: PropTypes.string,

    isFetchingToken: PropTypes.bool,

    requiresLogin: PropTypes.bool,

    isSubmitting: PropTypes.bool
  };

  static defaultProps = {
    refreshToken: null,
    isFetchingToken: false
  };

  state = {
    form: FORM_TYPES.PRECHECK,
    formFields: FORM_TYPES.PRECHECK
  };

  componentDidMount() {
    this.props.getCacheToken();
  }

  showForm = formType => () => {
    console.log("Showing form", formType);
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
    switch (formType) {
      case FORM_TYPES.PRECHECK:
        setTimeout(() => {
          this.setState({
            formFields: formType
          });
        }, 100);
        break;
      default:
        this.setState({
          formFields: formType
        });
        break;
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
          password: string()
            .min(6)
            .required()
        });
    }
  };

  submitForm = (values, { setSubmitting, setErrors }) => {
    if (this.state.form === FORM_TYPES.PRECHECK) {
      return this.props
        .validateEmail(values.email)
        .then(() => {
          this.showForm(FORM_TYPES.LOGIN)();
        })
        .catch(() => {
          this.showForm(FORM_TYPES.SIGNUP)();
        });
    }

    if (this.state.form === FORM_TYPES.LOGIN) {
      setSubmitting(true);

      return this.props
        .login({ username: values.email, password: values.password })
        .catch(() => {
          setErrors({ form: "The username or password is incorrect" });
        });
    }

    if (this.state.form === FORM_TYPES.SIGNUP) {
      return this.props
        .signup(values.email, values.password)
        .then(successAction => {
          this.props.login({
            refreshToken: successAction.payload.refreshToken.refresh_token
          });
        })
        .catch(err => {
          setErrors(err);
        });
    }
  };

  render() {
    const {
      state: { form },
      props: { isFetchingToken, refreshToken, requiresLogin, isSubmitting }
    } = this;

    if (isFetchingToken) {
      return null;
    } else if (!isFetchingToken && refreshToken) {
      this.props.login({ refreshToken });
      return null;
    }

    if (requiresLogin) {
      const formFields = this.formFields();
      return (
        <Modal>
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
                      handleSubmit
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Container>
                          <div>
                            <Logo.Text />
                          </div>
                          <div>
                            <Header as="h3">
                              {form === FORM_TYPES.PRECHECK &&
                                "Enter your email"}
                              {form === FORM_TYPES.LOGIN &&
                                "Sign in your email"}
                              {form === FORM_TYPES.SIGNUP &&
                                "Sign up your email"}
                            </Header>

                            <HR />
                          </div>
                          <div>
                            <ErrorLabel>{errors.form}</ErrorLabel>
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
                              keys={formFields.map(item => item.key)}
                            >
                              {formFields.map(
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
                                      name={item.name}
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
                              {form === FORM_TYPES.LOGIN && "Login"}
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
        </Modal>
      );
    }

    return null;
  }
}
