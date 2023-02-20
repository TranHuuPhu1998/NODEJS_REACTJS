import { lazy } from "react";
const DashBoard = lazy(() => import("../../pages/admin/dashboard"));
const Categories = lazy(() => import("../../pages/admin/categories"));
const Users = lazy(() => import("../../pages/admin/users"));
const Course = lazy(() => import("../../pages/admin/courses"));
const Profile = lazy(() => import("../../pages/profile"));
const Exercise = lazy(() => import("../../pages/exercise"));
const CourseUser = lazy(() => import("../../pages/courses"));
const Chat = lazy(() => import("../../pages/chat"));
const Home = lazy(() => import("../../pages/home"));

export default [
  {
    path: "/admin",
    exact: true,
    component: DashBoard,
  },
  {
    path: "/admin/categories",
    exact: true,
    component: Categories,
  },
  {
    path: "/admin/users",
    exact: true,
    component: Users,
  },
  {
    path: "/admin/course",
    exact: true,
    component: Course,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/exercise",
    exact: true,
    component: Exercise,
  },
  {
    path: "/courses",
    exact: true,
    component: CourseUser,
  },
  {
    path: "/chat",
    exact: true,
    component: Chat,
  },
  {
    path: "/",
    exact: true,
    component: Home,
  },
];
