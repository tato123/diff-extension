import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import Label from "components/Text/Label";
import styled from "styled-components";

const StyledLabel = styled(Label)`
  letter-spacing: 1.1px;
  font-size: 11px;
`;

const DateTime = ({ date }) => (
  <div>
    <StyledLabel as="overline">
      {date && format(date, "dddd, MMM D, YYYY - h:mm A")}
    </StyledLabel>
  </div>
);

DateTime.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ])
};

export default DateTime;
