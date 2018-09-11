import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  right: 60px;
  bottom: 136px;
  z-index: 999999999;
`;

Modal.Content = styled.div`
  z-index: 999999999;
  position: relative;
  background-color: #191b3b;
  padding: 16px;
  border: none;
  width: 350px;
  color: #fff;
  border-radius: 8px;
  min-height: 400px;
  box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, 0.3);
`;

export default Modal;
