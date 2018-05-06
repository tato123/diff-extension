import React from "react";
import ShadowDOM from "react-shadow";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 10px;

  min-width: 100px;
  height: 38px;
  z-index: 1000000000;
  left: 25px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border: none;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const Tool = styled.div`
  display: flex;
  width: 32px;
  cursor: pointer;
  justify-content: center;
  height: 100%;
  align-items: center;
`;

export default class ShadowComponent extends React.Component {
  render() {
    return (
      <Container>
        <Tool>x</Tool>
        <Tool>x</Tool>
      </Container>
    );
  }
}
