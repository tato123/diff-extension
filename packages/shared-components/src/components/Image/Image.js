import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledImage = styled.img`
  ${props =>
    props.small &&
    `
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
  `};
`;

const Avatar = styled(StyledImage)`
  border-radius: 50%;
`;

const Image = ({ avatar, ...rest }) => {
  if (avatar === true) {
    return <Avatar avatar {...rest} />;
  }

  return <StyledImage {...rest} />;
};

Image.propTypes = {
  avatar: PropTypes.bool
};

export default Image;
