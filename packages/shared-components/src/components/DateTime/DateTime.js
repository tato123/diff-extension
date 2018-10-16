import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import Label from 'components/Text/Label';
import styled from 'styled-components';

const DateTimeStyle = styled.span`
  font-size: var(--df-font-xs);
  color: var(--df-text-color-light);
  display: block;
`;

const DateTime = ({ date }) => (
  <DateTimeStyle>
    {date && format(date, 'dddd, MMM D, YYYY - h:mm A')}
  </DateTimeStyle>
);

DateTime.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ])
};

export default DateTime;
