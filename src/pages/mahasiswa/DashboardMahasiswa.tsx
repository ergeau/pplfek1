import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";

const DashboardMahasiswa: FC = () => {
  const user = AuthUser.GetAuth();

  const GetCurrentUser = async () => {
    try {
      const res = await Http.get("/user/detail", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      console.log(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen ">
      <Navbar name="yanto gaming"></Navbar>
      <p>Ini Dashboard</p>
      <button onClick={GetCurrentUser} className="btn btn-primary normal-case">
        Get Current User
      </button>
    </div>
  );
};

export default DashboardMahasiswa;
