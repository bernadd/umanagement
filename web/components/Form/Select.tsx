import { darken } from "polished";
import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import styled from "styled-components";

const SelectStyled = styled.select`
  height: 42px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => darken(0.2, theme.colors.light)};
  padding: 0 14px;
  width: 100%;
`;

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  children: React.ReactNode | React.ReactNode[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <SelectStyled {...rest} ref={ref}>
        {children}
      </SelectStyled>
    );
  }
);

Select.displayName = "Select";
