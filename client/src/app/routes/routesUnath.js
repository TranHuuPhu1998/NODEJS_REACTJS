import { lazy } from "react";
const singIn = lazy(() => import("../../pages/login"));
const register = lazy(() => import("../../pages/register"));

export default [
  {
    path: "/",
    exact: true,
    component: singIn,
  },
  {
    path: "/register",
    exact: true,
    component: register,
  },
];
