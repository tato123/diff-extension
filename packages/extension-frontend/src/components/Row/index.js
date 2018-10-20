import styled from 'styled-components';

const ItemRow = styled.div`
  border-bottom: var(--df-border);
  padding: 16px;

  &.annotation {
    color: #231c47;
    font-size: 14px;
  }

  &:hover {
    background: rgb(67, 202, 217, 0.1);
    cursor: pointer;
  }

  &.no-hover {
    background: transparent;
    cursor: initial;
  }

  ${props =>
    props.highlight === false &&
    `
    background: transparent !important;
    cursor: initial !important;
  `};

  .annotation-id {
    font-weight: bold;
    color: var(--df-text-color);
    margin-bottom: var(--df-space-2);
    display: block;
  }

  .tags {
    display: flex;
    flex-direction: row;

    span,
    div {
      color: var(--df-text-color-light);
    }

    span {
      font-weight: 500;
      font-size: var(--df-font-xs);
    }
  }
`;

export default ItemRow;
