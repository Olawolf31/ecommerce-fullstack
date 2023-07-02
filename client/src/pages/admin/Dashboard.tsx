import React from "react";
import SideBar from "components/Admin/SideBar";
import DashboardStats from "components/Admin/SidebarMenu/DashboardStats";
import ManageProducts from "components/Admin/SidebarMenu/ManageProducts";
import ManageCategories from "components/Admin/SidebarMenu/ManageCategories";
import ManageUsers from "components/Admin/SidebarMenu/ManageUsers";
import { useAppSelector } from "redux/hooks";
import Spinner from "components/Spinner";
type Props = {};

const Dashboard = (props: Props) => {
  const { selectedMenu, isLoading } = useAppSelector((state) => state.auth);


  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex-grow mt-28 pl-8">
        {selectedMenu === "general" && <DashboardStats />}
          {selectedMenu === "products" && <ManageProducts />}
          {selectedMenu === "categories" && <ManageCategories />}
          {selectedMenu === "users" && <ManageUsers />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
