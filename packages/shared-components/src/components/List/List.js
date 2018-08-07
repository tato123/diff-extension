import styled from "styled-components";
import { types as HeaderTypes } from "components/Text/Header";
import { types as LabelTypes } from "components/Text/Label";
import { get } from "theme";

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;

  > div {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  > div:last-child {
    border-bottom: none;
  }
`;

List.Item = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5em 0;
  flex: 1 auto;

  > :first-child {
    margin-right: 1em;
  }

  span,
  img {
    display: inline-block;
  }
`;

List.Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  max-width: inherit;
  line-height: 1.5;
`;

List.Header = styled(HeaderTypes.h6)`
  margin: 0 !important;
  padding: 0 !important;
  text-transform: uppercase;
  max-width: inherit;
  width: inherit;
  min-width: inherit;
  font-size: 16px !important;
  font-weight: 500 !important;
  letter-spacing: 1.2px !important;
  ${props => props.new && "color: #dc377a !important;"};
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

List.SubHeader = styled(LabelTypes.overline)`
  margin: -2px 0 0 0 !important;
  text-transform: none;
  color: ${get("colors.white1")};
  max-width: inherit;
  width: inherit;
  min-width: inherit;
`;

List.Description = styled.div`
  margin: 8px 0 !important;
  overflow-wrap: break-word;
  max-width: inherit;
  width: inherit;
  min-width: inherit;
  font-size: 14px !important;
`;

export default List;
