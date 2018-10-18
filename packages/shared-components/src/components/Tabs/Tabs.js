import styled from 'styled-components';

const Tabs = styled.div`
  min-height: 30px;
  height: 30px;
  max-height: 30px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: 1px;
    width: 100%;
    bottom: 1px;
  }

  .bp3-tab-indicator {
    background-color: #fff;
  }

  .bp3-tab[aria-selected='true'] {
    color: #fff;
  }

  .bp3-tab {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }

  .bp3-tab:focus {
    outline: none;
  }
`;

export default Tabs;
