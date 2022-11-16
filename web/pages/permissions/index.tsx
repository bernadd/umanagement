import PermissionsTableList from "@/components/PermissionsTableList";
import React from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";

const PermissionsPage: NextPageWithLayout = () => {
  return <PermissionsTableList />;
};

PermissionsPage.getLayout = function (page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PermissionsPage;
