import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import Label from "components/Text/Label";

const DateTime = ({ date }) => (
  <div>
    <Label as="overline">
      {date && format(date, "dddd, MMM D, YYYY - h:mm A")}
    </Label>
  </div>
);

DateTime.propTypes = {
  date: PropTypes.date
};

export default DateTime;
