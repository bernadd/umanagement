import { TOP_NAV_TEMPLATE_AREA } from "@/styles/constants";
import React from "react";
import styled from "styled-components";

const TopNavStyled = styled.div`
  height: 6.4rem;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  grid-area: ${TOP_NAV_TEMPLATE_AREA};
`;

export default function TopNa() {
  return <TopNavStyled />;
}
