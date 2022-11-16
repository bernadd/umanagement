import * as styled from "styled-components";

export const GlobalStyles = styled.createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-size: 1.4rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    line-height: 1.5;
    background-color: #ebeff3;
  }

  .column {
    display: flex;
    align-items: center;
  }

  .sort-icon {
    display: flex;
    align-items: center;
    align-items: center;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .select-none {
    user-select: none;
  }
`;
