import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { spinner } from "react-icons-kit/fa/spinner";

const Container = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  background: #e63a7d;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  opacity: 1;
  position: absolute;
  left: -16px;
  top: -16px;
`;

export default class Bubble extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    loading: PropTypes.bool
  };

  static defaultProps = {
    value: "",
    loading: false
  };

  render() {
    const { value, loading } = this.props;

    return <Container>{loading ? <Icon icon={spinner} /> : value}</Container>;
  }
}
