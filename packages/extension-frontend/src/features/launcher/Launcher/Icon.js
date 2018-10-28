import styled from 'styled-components';
import { animated } from 'react-spring';

const AnimatedImg = styled(animated.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: top left;
  will-change: transform;
`;

AnimatedImg.config = {
  duration: 150
};

export default AnimatedImg;
