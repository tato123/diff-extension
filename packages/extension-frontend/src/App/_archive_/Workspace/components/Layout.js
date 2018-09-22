import styled from "styled-components";

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 auto;
  justify-content: flex-end;

  button:first-child {
    margin-right: 16px;
  }
`;

export const FormRegion = styled.div`
  display: flex;
  height: 265px;
  flex: 1 auto;
  width: 100%;
  flex-direction: column;
`;

export const TitleRegion = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 auto;

  a {
    align-items: center;
    display: flex;
  }
`;
