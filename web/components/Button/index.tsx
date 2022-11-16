import styled, { css, DefaultTheme } from "styled-components";
import { darken } from "polished";
import React, { forwardRef } from "react";

type ButtonVariant = "primary" | "light" | "white";

const variantStyles = (
  theme: DefaultTheme,
  variant: ButtonVariant = "primary"
) =>
  ({
    light: css`
      background-color: ${theme.colors.light};
      :hover {
        background-color: ${darken(0.1, theme.colors.light)};
      }
    `,
    primary: css`
      background-color: ${theme.colors.primary};
      color: white;
      :hover {
        background-color: ${darken(0.1, theme.colors.primary)};
      }
    `,
    white: css`
      background-color: white;
    `,
  }[variant]);

export const BaseButton = styled.button<{ variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  box-shadow: none;
  outline: 0;
  border: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;

  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }

  + Button {
    margin-left: 6px;
  }

  ${({ theme, variant }) => variantStyles(theme, variant)};
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

type ButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
} & React.ComponentPropsWithoutRef<"button">;

export type Ref = HTMLButtonElement;

export const ButtonStyled = styled(BaseButton)`
  border-radius: 4px;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 1.2rem;
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "light", ...rest }, ref) => {
    return (
      <ButtonStyled ref={ref} variant={variant} {...rest}>
        {children}
      </ButtonStyled>
    );
  }
);

Button.displayName = "Button";

export const CircleButtonStyled = styled(BaseButton)`
  border-radius: 500rem;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
`;

export const CircleButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "light", ...rest }, ref) => {
    return (
      <CircleButtonStyled ref={ref} variant={variant} {...rest}>
        {children}
      </CircleButtonStyled>
    );
  }
);

CircleButton.displayName = "CircleButton";
