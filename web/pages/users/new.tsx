import UserForm from "@/components/UserForm";
import SidebarLayout from "layouts/SidebarLayout";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import styled from "styled-components";
import { useCreateUser } from "hooks/useUsers";

const UserFormWrapper = styled.div`
  border-radius: 4px;
  background-color: white;
  padding: 20px;
`;

const UserEditPage: NextPageWithLayout = () => {
  // query mutate hook to create a user
  const createUser = useCreateUser();

  return (
    <UserFormWrapper>
      <UserForm
        isLoading={createUser.isLoading}
        isCreating
        onSubmitForm={(user) => {
          createUser.mutate(user);
        }}
      />
    </UserFormWrapper>
  );
};

UserEditPage.getLayout = function (page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default UserEditPage;
