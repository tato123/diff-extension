import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "react-icons-kit";

const Button = styled.button`
  background: none;
  outline: none;
  border: 1px solid var(--white);
  color: #fff;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: var(--font-thin);

  &:hover {
    background-color: var(--white-2);
  }
`;

const FAIcon = styled(Icon)`
  margin-right: 8px;
  font-size: var(--font-sm);
`;

export default class Button extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    icon: null,
    children: null
  };

  render() {
    const { icon, children } = this.props;
    return (
      <Button>
        ${icon && <FAIcon icon={icon} />}
        {children}
      </Button>
    );
  }
}
