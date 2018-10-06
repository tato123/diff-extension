import React from 'react';
import { Header } from '@diff/shared-components';
import featureImage from './track.png';
import FeaturePop from './FeaturePop';

const TrackFeature = () => (
  <FeaturePop>
    {active => (
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <Header as="h3">Track</Header>
          <p>Tracks every design change in your HTML and CSS</p>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <FeaturePop.Pop fade={active}>
            <img className="img-fluid" src={featureImage} alt="track feature" />
          </FeaturePop.Pop>
        </div>
      </div>
    )}
  </FeaturePop>
);

export default TrackFeature;
