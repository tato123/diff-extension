import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledImage = styled.img``;

const Avatar = styled(StyledImage)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  min-width: 24px;
  min-height: 24px;
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
