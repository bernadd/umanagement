import { darken } from "polished";
import { forwardRef } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  height: 42px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => darken(0.2, theme.colors.light)};
  padding: 0 14px;
  width: 100%;
`;

type InputProps = {
  numberOnly?: boolean;
  email?: boolean;
};

export const InputField = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & InputProps
>((props, ref) => {
  const { ...rest } = props;

  return <InputStyled ref={ref} {...rest} />;
});

InputField.displayName = "InputField";
