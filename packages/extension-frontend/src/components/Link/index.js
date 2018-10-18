// What <Link> should always be
import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor } from '@diff/shared-components';
import styled from 'styled-components';

const CustomLink = styled(Link)``;

export default ({ to, children, ...props }) => {
  // It is a simple element with nothing to link to
  if (!to) return <span {...props}>{children}</span>;

  // It is intended to be an external link
  if (/^https?:\/\//.test(to))
    return (
      <Anchor href={to} {...props}>
        {children}
      </Anchor>
    );

  // Finally, it is an internal link
  return (
    <CustomLink to={to} {...props}>
      {children}
    </CustomLink>
  );
};
