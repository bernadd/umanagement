import { useRouter } from "next/router";
import { IPermission } from "./../types/permission.type";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export enum ServerStateKeysEnum {
  Permissions = "permissions",
}

async function fetchPermissions(page: number, limit: number) {
  const pageToFetch = page - 1;
  const response: AxiosResponse<{ permissions: IPermission[]; count: number }> =
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/permissions?page=${pageToFetch}`
    );

  return response.data;
}

async function createPermission(user: IPermission) {
  const response: AxiosResponse<IPermission> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/permissions`,
    user
  );

  return response.data;
}

async function deletePermission(permissionId: number) {
  const response: AxiosResponse<IPermission> = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/permissions/${permissionId}`
  );

  return response.data;
}

export const usePermissions = (page: number, limit: number) =>
  useQuery<{ permissions: IPermission[]; count: number }>(
    [ServerStateKeysEnum.Permissions, page],
    () => fetchPermissions(page, limit),
    {
      initialData: {
        permissions: [],
        count: -1,
      },
    }
  );

export const useCreatePermission = () => {
  const router = useRouter();
  const cache = useQueryClient();

  return useMutation(createPermission, {
    onSuccess: () => {
      router.push(`/permissions`, `/permissions`, {
        shallow: true,
      });
      toast.success("Successfully created permission", {
        position: toast.POSITION.TOP_CENTER,
      });
      cache.invalidateQueries({ queryKey: ServerStateKeysEnum.Permissions });
    },
    onError: () => {
      toast.error("Something wrong happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
};

export const useDeletePermission = () => {
  const cache = useQueryClient();

  return useMutation(deletePermission, {
    onSuccess: () => {
      toast.success("Successfully created permission", {
        position: toast.POSITION.TOP_CENTER,
      });
      cache.invalidateQueries({ queryKey: ServerStateKeysEnum.Permissions });
    },
    onError: () => {
      toast.error("Something wrong happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
};
