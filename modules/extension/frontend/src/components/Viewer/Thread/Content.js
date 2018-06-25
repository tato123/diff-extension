import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import format from "date-fns/format";

const ThreadItem = styled.div`
  display: grid;
  grid-template-areas: ". .";
  grid-template-columns: 32px;
  flex: 1;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 16px;
`;

const ThreadItemLabel = styled.label`
  text-transform: uppercase;
  display: block;
  font-size: 14px;
  margin: 0;
  padding: 0;
  height: 20px;
`;

const AvatarContainer = styled.div`
  padding-top: 4px;
`;

const PlaceholderAvatar = styled.div`
  display: block;
  height: 16px;
  width: 16px;
  background: #ccc;
  border-radius: 50%;
`;

const DateTimeLabel = styled.label`
  display: block;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
`;

const DateTime = ({ date }) => (
  <DateTimeLabel>{format(date, "dddd, MMM D, YYYY - h:mm A")}</DateTimeLabel>
);

const Content = ({ children, data: item, ...rest }) => (
  <ThreadItem>
    <AvatarContainer>
      <PlaceholderAvatar />
    </AvatarContainer>
    <div>
      <ThreadItemLabel>{item.type}</ThreadItemLabel>
      <DateTime date={item.meta.created} />
      {children}
    </div>
  </ThreadItem>
);

export default Content;
