import styled from "styled-components";
import { darken } from "polished";
import { forwardRef } from "react";

export const FormWrapper = styled.form`
  margin: 0 auto;
`;

export const FormGroup = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 1.4rem;
`;

export const FormLabel = styled.label`
  display: inline-flex;
  justify-content: flex-end;
  padding: 0 10px;
`;

const InputStyled = styled.input`
  height: 42px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => darken(0.2, theme.colors.light)};
  padding: 0 14px;
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

  return <InputStyled {...rest} ref={ref} />;
});

InputField.displayName = "InputField";
