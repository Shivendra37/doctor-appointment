import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DoctorRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return user !== null && user.isAdmin === false && user.isDoctor === true ? (
    <Outlet />
  ) : (
    navigate("/login")
  );
};

export default DoctorRoutes;
