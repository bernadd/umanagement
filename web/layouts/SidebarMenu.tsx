import styled from "styled-components";
import { SIDEBAR_TEMPLATE_AREA } from "../styles/constants";
import { darken } from "polished";
import Link from "next/link";

const menuItems = [
  {
    name: "Users",
    href: "/users",
  },
  {
    name: "Manage Permissions",
    href: "/permissions",
  },
];

const SidebarMenuStyled = styled.aside`
  grid-area: ${SIDEBAR_TEMPLATE_AREA};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const SidebarMenuHeader = styled.div`
  padding: 10px;
  font-size: 16px;
  font-weight: 700;
  font-style: italic;
  background-color: ${({ theme }) => darken(0.02, theme.colors.primary)};
  color: white;
  padding: 20px;
`;

const MenuWrapper = styled.div`
  display: block;
  padding: 20px;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  list-style: none;
`;

const A = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  display: block;
  font-weight: 600;
  color: white;
  padding: 10px 0;
`;

export function SidebarMenu() {
  return (
    <SidebarMenuStyled>
      <SidebarMenuHeader>UM App</SidebarMenuHeader>
      <MenuWrapper>
        <Ul>
          {menuItems.map((item) => {
            return (
              <Li key={item.href}>
                <A href={item.href}>{item.name}</A>
              </Li>
            );
          })}
        </Ul>
      </MenuWrapper>
    </SidebarMenuStyled>
  );
}
