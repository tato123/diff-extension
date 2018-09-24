import styled from "styled-components";

const Status = styled.div`
  width: 16px;
  height: 16px;
  background: ${({ pending }) => (pending ? "#bababa" : "#5ebf4b")};
  border-radius: 50%;
  align-items: center;
  position: relative;

  ${({ pending }) =>
    pending &&
    `
    &:after {
      content: "...";
    color: #fff;
    font-size: 13px;
    position: absolute;
    left: 3px;
    top: -3px;
    text-shadow: 0 0 1px rgba(0,0,0,0.8);
    letter-spacing: 0.2px;
    }
  `};
`;

export default Status;
