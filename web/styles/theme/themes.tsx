export const defaultTheme = {
  colors: {
    primary: "#1e242b",
    secondary: "#88ade8",
    success: "#bbe1ac",
    light: "#f5f7f9",
    borderColor: "#ebeff3",
  },
};

export type Theme = typeof defaultTheme;

export const themes = { default: defaultTheme };
