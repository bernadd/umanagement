import { IUser } from "./../types/user.types";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export enum ServerStateKeysEnum {
  Users = "users",
  User = "user",
}

async function getUsers(page: number, limit: number) {
  const pageToFetch = page - 1;
  const response: AxiosResponse<{ users: IUser[]; count: number }> =
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users?page=${pageToFetch}`
    );

  return response.data;
}

async function getUser(id: string) {
  const response: AxiosResponse<IUser> = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`
  );

  return response.data;
}

async function createUser(user: IUser) {
  const response: AxiosResponse<IUser> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`,
    user
  );

  return response.data;
}

async function patchUser(user: IUser) {
  const response: AxiosResponse<IUser> = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${user.id}`,
    user
  );

  return response.data;
}

async function deleteUser(id: number) {
  const response: AxiosResponse<IUser[]> = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`
  );

  return response.data;
}

export const useUsers = (page: number, limit: number) => {
  return useQuery([ServerStateKeysEnum.Users, page], () =>
    getUsers(page, limit)
  );
};

export const useUser = (id: string) => {
  return useQuery([ServerStateKeysEnum.User, id], () => getUser(id), {
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const router = useRouter();
  const cache = useQueryClient();

  return useMutation(createUser, {
    onSuccess: (data) => {
      router.push(`/users/${data.id}`, `/users/${data.id}`, {
        shallow: true,
      });
      toast.success("Successfully created user", {
        position: toast.POSITION.TOP_CENTER,
      });
      cache.invalidateQueries({ queryKey: ServerStateKeysEnum.Users });
    },
    onError: () => {
      toast.error("Something wrong happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
};

export const useUpdateUser = () => {
  const cache = useQueryClient();

  return useMutation(patchUser, {
    onSuccess: (data) => {
      toast.success("Successfully updated user", {
        position: toast.POSITION.TOP_CENTER,
      });
      cache.invalidateQueries({ queryKey: ServerStateKeysEnum.User });
    },
    onError: () => {
      toast.error("Something wrong happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
};

export const useDeleteUser = (page: number) => {
  const cache = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      toast.success("Successfully deleted user", {
        position: toast.POSITION.TOP_CENTER,
      });
      cache.invalidateQueries([ServerStateKeysEnum.Users, page]);
    },
    onError: () => {
      toast.error("Something wrong happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
};
