import React from "react";
import styled from "styled-components";
import TaggedElements from "./TaggedElements";

const Container = styled.div`
  z-index: 2147483000 !important;
  position: fixed !important;
  bottom: 20px;
  right: 20px;
  width: 376px !important;
  min-height: 250px !important;
  max-height: 704px !important;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  opacity: 1 !important;
  background: #fff;

  display: flex;
  flex-direction: column;
  transform: translateY(-124px);
`;

const Header = styled.div`
  height: 25px;
  position: relative;
  min-height: 75px;
  background: var(--gradient-purple);

  background-blend-mode: overlay;
  color: #fff;
  -webkit-transition: height 0.16s ease-out;
  transition: height 0.16s ease-out;
`;

const Window = () => (
  <Container>
    <Header />
    <div>
      <TaggedElements />
    </div>
  </Container>
);

export default Window;
