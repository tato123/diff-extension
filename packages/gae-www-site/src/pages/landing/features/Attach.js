import React from 'react';
import { Header } from '@diff/shared-components';
import styled from 'styled-components';
import featureImage from './attach.png';
import FeaturePop from './FeaturePop';

const OrderDiv = styled.div`
  @media (max-width: 575.98px) {
    order: ${props => props.order};
  }
`;

const AttachFeature = () => (
  <FeaturePop>
    {fade => (
      <div className="row">
        <OrderDiv order="2" className="col-12 col-sm-6 col-md-6 col-lg-6">
          <FeaturePop.Pop fade={fade}>
            <img
              className="img-fluid"
              src={featureImage}
              alt="attach feature"
            />
          </FeaturePop.Pop>
        </OrderDiv>
        <OrderDiv order="1" className="col-12 col-sm-6 col-md-6 col-lg-6 ">
          <Header as="h3">Attach</Header>
          <p>Target specific page elements and directly share design assets</p>
        </OrderDiv>
      </div>
    )}
  </FeaturePop>
);

export default AttachFeature;
