import { IPermissionUser } from "./../types/permission-user.type";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ServerStateKeysEnum as UserKeys } from "./useUsers";

async function createPermissionUser(permissionUser: IPermissionUser) {
  const response: AxiosResponse<IPermissionUser> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/permissions-users`,
    permissionUser
  );

  return response.data;
}

async function deletePermissionUser(permissionUser: IPermissionUser) {
  const response: AxiosResponse<IPermissionUser> = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/permissions-users/${permissionUser.userId}/permission/${permissionUser.permissionId}`
  );

  return response.data;
}

export const useCreatePermissionUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createPermissionUser, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Successfully added permissions", {
        position: toast.POSITION.TOP_CENTER,
      });
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something wrong happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
};

export const useDeletePermissionUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePermissionUser, {
    onSuccess: () => {
      toast.success("Successfully removed permissions", {
        position: toast.POSITION.TOP_CENTER,
      });
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Something wrong happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
};
