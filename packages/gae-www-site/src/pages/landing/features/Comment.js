import React from 'react';
import { Header } from '@diff/shared-components';
import featureImage from './comment.png';
import FeaturePop from './FeaturePop';

const CommentFeature = () => (
  <FeaturePop>
    {active => (
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <Header as="h3">Comment</Header>
          <p>Create and view comments in realtime from your entire team</p>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <FeaturePop.Pop fade={active}>
            <img
              className="img-fluid"
              src={featureImage}
              alt="comment feature"
            />
          </FeaturePop.Pop>
        </div>
      </div>
    )}
  </FeaturePop>
);

export default CommentFeature;
