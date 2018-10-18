import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  ${({ size }) => {
    if (size === 'sm') {
      return `
                width: 32px;
                height: 32px;
            `;
    }
  }};
`;

const Logo = ({ ...rest }) => (
  <Image
    src="https://storage.googleapis.com/diff-assets/logo-diff-white.png"
    {...rest}
  />
);

export default Logo;
