import React, { useEffect } from "react";
import RTLNavbar from "./Navbar/RTLNavbar";
import { logout } from "../app/actions/auth";
import { useDispatch } from "react-redux";
import { getOneUser } from "../app/actions/user";
import "./styles.scoped.scss";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();

  const handleLogout = (token) => {
    dispatch(logout(token));
  };

  useEffect(() => {
    dispatch(getOneUser());
  }, []);

  return (
    <>
      <RTLNavbar handleLogout={handleLogout} />
      <div className="children-user">{children}</div>
    </>
  );
};

export default AdminLayout;
