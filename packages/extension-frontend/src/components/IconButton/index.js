import { Icon } from 'react-icons-kit';
import styled from 'styled-components';

const IconButton = styled(Icon)`
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  ${props => props.color && `color: ${props.color}`};

  &:hover {
    background: var(--df-hover-color);
  }
`;

export default IconButton;
