import React from "react";
import styled from "styled-components";

const styles = {
  H1: styled.h1``
};

const H1 = ({ children, ...rest }) => (
  <styles.H1 {...rest}>{children}</styles.H1>
);

export default H1;
