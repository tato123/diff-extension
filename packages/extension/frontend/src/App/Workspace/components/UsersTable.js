import styled from "styled-components";

const UsersTable = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .listing {
    display: flex;
    flex-direction: column;
    > div.userRow {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px 0;

      > div:last-child {
        display: flex;
        align-items: center;
      }
    }
    > div.userRow:first-child {
      padding-top: 0;
    }

    > div.userRow:last-child {
      border-bottom: none;
    }

    .displaynameCell {
      align-self: center;
    }
  }

  > button {
    margin-top: 16px;
  }
`;

export const UserRow = styled.div`
  display: grid;
  grid-template-areas: ". . .";
  grid-template-columns: 48px 1fr 48px;
  grid-template-rows: 1fr;
`;

export default UsersTable;
