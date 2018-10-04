import styled from 'styled-components';
import { Label } from 'components/Text';

export default styled(Label)`
  color: ${({ type }) => {
    switch (type) {
      case 'from':
        return 'red';
      case 'to':
        return 'green';
      default:
        return 'white';
    }
  }};
  margin: 0 0.2em;
  display: ${({ inline = false }) => (inline ? 'inline' : 'block')};
`;
