import React from "react";
import PropTypes from "prop-types";
import { Label } from "components/Text";
import CodeLabel from "./Label";
import Space from "./Space";

const PropertyList = ({ label, properties }) => {
  return properties.map((property, idx) => (
    <div key={idx}>
      {property.name && (
        <Space right="sm">
          <Label>{property.name}:</Label>
        </Space>
      )}
      <Space right="xs">
        <CodeLabel type="from" inline>
          {property.from}
        </CodeLabel>
      </Space>
      <CodeLabel type="to" inline>
        {property.to}
      </CodeLabel>
    </div>
  ));
};

PropertyList.propTypes = {
  label: PropTypes.string,
  properties: PropTypes.array
};

export default PropertyList;
