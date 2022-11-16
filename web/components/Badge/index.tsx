import { UserStatus } from "@/types/user.types";
import { darken } from "polished";
import styled, { css, DefaultTheme } from "styled-components";

const variantStyles = (theme: DefaultTheme, variant: UserStatus = "Active") =>
  ({
    Active: css`
      background-color: ${theme.colors.success};
      color: ${darken(0.6, theme.colors.success)};
    `,
    Inactive: css`
      background-color: ${theme.colors.light};
    `,
  }[variant]);

export const Badge = styled.span<{ variant: UserStatus }>`
  text-align: center;
  display: block;
  width: 100%;
  border-radius: 500px;
  padding: 6px 10px;
  ${({ theme, variant }) => variantStyles(theme, variant)};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 1rem;
`;
