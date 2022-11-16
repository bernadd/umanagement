import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import { ReactElement } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import UsersTableList from "../../components/UsersTableList";
import SidebarLayout from "../../layouts/SidebarLayout";
import { IUser } from "../../types/user.types";
import { NextPageWithLayout } from "../_app";

const UsersPage: NextPageWithLayout = () => {
  return <UsersTableList />;
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

// We fetch data SSR and hydrate on client, when react query is run on client it will have access to data immediately
// check _app.tsx for implementation of Hydrate
export async function getServerSideProps({ req }: { req: NextRequest }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["users", 0, 10], async () => {
    const response: AxiosResponse<{ results: IUser[] }> = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users?limit=10&page=0`
    );
    return response.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default UsersPage;
