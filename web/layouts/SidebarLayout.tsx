import React from "react";
import styled from "styled-components";
import {
  PRIMARY_VIEW_TEMPLATE_AREA,
  SIDEBAR_TEMPLATE_AREA,
  TOP_NAV_TEMPLATE_AREA,
} from "../styles/constants";
import { SidebarMenu } from "./SidebarMenu";
import TopNav from "./TopNav";

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 220px auto;
  grid-template-rows: 64px auto;
  grid-template-areas: "${SIDEBAR_TEMPLATE_AREA} ${TOP_NAV_TEMPLATE_AREA}" "${SIDEBAR_TEMPLATE_AREA} ${PRIMARY_VIEW_TEMPLATE_AREA}";
  min-height: 100vh;
  min-width: 100vw;
`;

const PrimaryView = styled.div`
  grid-area: ${PRIMARY_VIEW_TEMPLATE_AREA};
  padding: 1rem;
`;

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <AppWrapper>
      <SidebarMenu />
      <TopNav />
      <PrimaryView>{children}</PrimaryView>
    </AppWrapper>
  );
}
