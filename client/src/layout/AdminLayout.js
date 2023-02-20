import React, { useEffect } from "react";
import AdminNavbar from "./Navbar/AdminNavbar";
import Sidebar from "./Sidebar/Sidebar";
import { logout } from "../app/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../app/actions/user";
import { ContentWrapper } from "../components";
import "./styles.scoped.scss";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducers);

  const handleLogout = (token) => {
    dispatch(logout(token));
  };

  useEffect(() => {
    dispatch(getOneUser());
  }, []);

  return (
    <>
      <AdminNavbar handleLogout={handleLogout} user={user} />
      <ContentWrapper>{children}</ContentWrapper>
      <Sidebar />
    </>
  );
};

export default AdminLayout;
