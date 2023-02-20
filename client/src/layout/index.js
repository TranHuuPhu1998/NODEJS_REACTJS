import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import AdminNavbar from "./Navbar/AdminNavbar";
import RTLNavbar from "./Navbar/RTLNavbar";
import Sidebar from "./Sidebar/Sidebar";
import { logout } from "../app/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../app/actions/user";
import { ContentWrapper } from "../components";
import "./styles.scoped.scss";

const LayoutAuth = ({ children, authenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducers);
  const checkUser = localStorage.getItem("LOGIN_TYPE");

  const handleLogout = (token) => {
    dispatch(logout(token));
  };

  useEffect(() => {
    dispatch(getOneUser());
  }, []);

  return (
    <>
      {authenticated ? (
        <>
          {checkUser === "user" ? (
            <>
              <RTLNavbar handleLogout={handleLogout} />
              <div className="children-user">{children}</div>
            </>
          ) : (
            <>
              <AdminNavbar handleLogout={handleLogout} user={user} />
              <ContentWrapper>{children}</ContentWrapper>
              <Sidebar />
            </>
          )}
        </>
      ) : (
        <>
          <Header />
          <div>{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default LayoutAuth;
