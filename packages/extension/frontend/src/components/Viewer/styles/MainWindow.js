import styled from "styled-components";

const MainWindow = styled.div`
  width: 340px;
  height: 627px;
  background: linear-gradient(to right, #171a3a, #221f41);
  position: absolute;
  top: 32px;
  left: 500px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 24px;
  display: grid;
  grid-row-gap: 26px;
  grid-template-columns: 1fr;
  grid-template-rows: 26px 65px;
  z-index: 999999999;
  box-sizing: border-box;
  overflow: hidden;
`;

export default MainWindow;
