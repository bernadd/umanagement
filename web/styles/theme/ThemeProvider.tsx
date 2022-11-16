import * as React from "react";
import { ThemeProvider as OriginalThemeProvider } from "styled-components";

import { themes } from "./themes";

export const ThemeProvider = (props: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <OriginalThemeProvider theme={themes.default}>
      {Array.isArray(props.children)
        ? props.children.map((children) => React.Children.only(children))
        : React.Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
