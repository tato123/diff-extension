import styled from 'styled-components';

const Anchor = styled.a`
  cursor: pointer;
  color: var(--color-text);
  transition: color 0.25s;

  &:hover {
    color: var(--color-text);
  }
`;

export default Anchor;
