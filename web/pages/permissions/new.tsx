import axios, { AxiosResponse } from "axios";
import SidebarLayout from "layouts/SidebarLayout";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { toast } from "react-toastify";
import { IPermission } from "@/types/permission.type";
import PermissionForm from "@/components/PermissionForm";
import { useCreatePermission } from "hooks/usePermissions";

const PermissionFormWrapper = styled.div`
  border-radius: 4px;
  background-color: white;
  padding: 20px;
`;

const PermissionNewPage: NextPageWithLayout = () => {
  const createPermission = useCreatePermission();

  return (
    <PermissionFormWrapper>
      <PermissionForm
        isLoading={createPermission.isLoading}
        isCreating
        onSubmitForm={(permission) => {
          createPermission.mutate(permission);
        }}
      />
    </PermissionFormWrapper>
  );
};

PermissionNewPage.getLayout = function (page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PermissionNewPage;
