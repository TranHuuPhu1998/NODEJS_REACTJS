import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./styles.scoped.scss";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default AuthLayout;
