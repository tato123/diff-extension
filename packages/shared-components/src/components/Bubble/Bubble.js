import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Label from "components/Text/Label";

const Container = styled.div`
  color: #fff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  background: #e63a7d;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  opacity: 1;
`;

export default class Bubble extends React.PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    value: ""
  };

  render() {
    const { value, style, className } = this.props;

    return (
      <Container style={style} className={className}>
        <Label as="button">{value}</Label>
      </Container>
    );
  }
}
