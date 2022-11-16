import UserForm from "@/components/UserForm";
import SidebarLayout from "layouts/SidebarLayout";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import styled from "styled-components";
import { useUpdateUser, useUser } from "hooks/useUsers";

const UserFormWrapper = styled.div`
  border-radius: 4px;
  background-color: white;
  padding: 20px;
`;

const UserEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  // Hooks for queries
  const { data: user } = useUser(id as string);
  const mutateUser = useUpdateUser();

  return (
    <UserFormWrapper>
      {user && (
        <UserForm
          isCreateForm
          user={user}
          isLoading={mutateUser.isLoading}
          onSubmitForm={(user) => {
            mutateUser.mutate(user);
          }}
        />
      )}
    </UserFormWrapper>
  );
};

UserEditPage.getLayout = function (page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default UserEditPage;
