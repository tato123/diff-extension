import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import format from "date-fns/format";
import { Header, Label } from "@diff/shared-components";

const ThreadItem = styled.div`
  display: grid;
  grid-template-areas: ". .";
  grid-template-columns: 32px;
  flex: 1;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 16px;
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

const DateTime = ({ date }) => (
  <div>
    <Label as="overline">{format(date, "dddd, MMM D, YYYY - h:mm A")}</Label>
  </div>
);

const Content = ({ children, data: item, ...rest }) => (
  <ThreadItem>
    <AvatarContainer>
      <PlaceholderAvatar />
    </AvatarContainer>
    <div>
      <Header as="h6" uppercase={true}>
        {item.type}
      </Header>
      <DateTime date={item.meta.created} />
      {children}
    </div>
  </ThreadItem>
);

export default Content;
