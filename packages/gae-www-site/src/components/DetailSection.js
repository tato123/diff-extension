import React from 'react';
import PropTypes from 'prop-types';

const DetailSection = ({ left, right, flexLeft, flexRight, className }) => (
  <div className={`row section ${className}`}>
    <div className="container-lg">
      <div className="row">
        <div className={['col', flexLeft && 'flex'].filter(x => x).join(' ')}>
          {left()}
        </div>
        <div className={['col', flexRight && 'flex'].filter(x => x).join(' ')}>
          {right()}
        </div>
      </div>
    </div>
  </div>
);

DetailSection.propTypes = {
  left: PropTypes.func.isRequired,
  right: PropTypes.func.isRequired
};

export default DetailSection;
