import React from 'react';
import { Header, Button } from '@diff/shared-components';
import styled from 'styled-components';

const Outlined = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 10px 20px;
`;

const CustomHeader = styled(Header)`
  color: rgb(67, 202, 217);
  font-weight: 500 !important;
  text-align: center;
`;

const Container = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const Diffs = () => (
  <div>
    <CustomHeader as="h2" uppercase>
      Comming soon
    </CustomHeader>
    <Outlined>
      <img
        src="https://storage.googleapis.com/diff-assets/assets.PNG"
        alt="Assets description"
      />
    </Outlined>

    <Container>
      <small>
        Tell us what you think about this feature and how you might improve it?
      </small>
    </Container>
    <Container>
      <Button>GIVE US FEEDBACK</Button>
    </Container>
  </div>
);

export default Diffs;
