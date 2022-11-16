import styled from "styled-components";

export const TableStyled = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  box-sizing: border-box;
  border-spacing: 0;

  th {
    background-color: ${({ theme }) => theme.colors.light};
    padding: 15px;
    font-weight: 500;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    font-size: 1.3rem;

    &:first-child {
      border-radius: 4px 0 0;
    }

    &:last-child {
      border-radius: 0 4px 0 0;
    }
  }

  td {
    padding: 10px 15px;
    vertical-align: middle;
    display: table-cell;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    background-color: white;
  }

  tfoot {
    td {
      background-color: ${({ theme }) => theme.colors.light};
    }
  }

  &.refetching {
    th,
    td {
      opacity: 0.5;
    }
  }
`;
