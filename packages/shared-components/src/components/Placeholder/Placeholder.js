import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PlaceholderContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #ccc;
  text-transform: uppercase;
    font-weight: bold;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}
`;

const Placeholder = ({ value }) => {
  const splits = value.split(" ");
  if (splits.length > 1) {
    return (
      <PlaceholderContainer>{splits[0][0] + splits[1][0]}</PlaceholderContainer>
    );
  } else {
    return <PlaceholderContainer>{value.substring(0, 2)}</PlaceholderContainer>;
  }
};

Placeholder.propTypes = {
  value: PropTypes.string.isRequired
};

export default Placeholder;
