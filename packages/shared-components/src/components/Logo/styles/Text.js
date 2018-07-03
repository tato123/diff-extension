import React from "react";
import styled from "styled-components";
import img from "../assets/logo-diff-white.png";

const Image = styled.img`
  ${({ size }) => {
    if (size === "sm") {
      return `
                width: 32px;
                height: 32px;
            `;
    }
  }};
`;

const Logo = ({ ...rest }) => <Image src={img} {...rest} />;

export default Logo;
