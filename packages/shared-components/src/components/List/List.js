import styled from "styled-components";
import { types as HeaderTypes } from "components/Text/Header";
import { types as LabelTypes } from "components/Text/Label";
import { get } from "theme";

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;
  min-width: 100%;
  width: 100%;

  > div {
    border-bottom: 1px solid ${get("colors.white1")};
  }

  > div:last-child {
    border-bottom: none;
  }
`;

List.Item = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5em 0;
  max-width: inherit;
  width: inherit;
  min-width: inherit;

  > :first-child {
    margin-right: 1em;
  }
`;

List.Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  max-width: inherit;
`;

List.Header = styled(HeaderTypes.h6)`
  margin: 0 !important;
  padding: 0 !important;
  text-transform: uppercase;
  max-width: inherit;
  width: inherit;
  min-width: inherit;
`;
List.SubHeader = styled(LabelTypes.overline)`
  margin: 0.2em 0;
  text-transform: none;
  color: ${get("colors.white1")};
  max-width: inherit;
  width: inherit;
  min-width: inherit;
`;
List.Description = styled.div`
  margin: 1em 0;
  overflow-wrap: break-word;
  max-width: inherit;
  width: inherit;
  min-width: inherit;
`;

export default List;
