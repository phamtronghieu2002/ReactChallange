import routes from "@/configs/routes";
import { ROLES } from "@/contants/Role";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Forbiden from "@/pages/403/Forbiden";
import emailRegister from "@/pages/EmailRegister/EmailRegister";
import Home from "@/pages/Home/Home";
import LoginPassword from "@/pages/LoginPassword/LoginPassword";
import LoginPhone from "@/pages/LoginPhone/LoginPhone";
import ManagerEmployee from "@/pages/ManagerEmployee/ManagerEmployee";
import Message from "@/pages/Message/Message";
import Register from "@/pages/Register/Register";
import ManageTask from "@/pages/ManageTask/ManageTask";
import React, { FC } from "react";

export interface IRoute {
  path: string;
  component: FC<{}> | null;
  layout?: FC<{ children: React.ReactNode }>;
  roles?: string[];
}

const publicRoutes: IRoute[] = [
  {
    component: LoginPhone,
    path: routes.loginPhone,
    layout: AuthLayout,
  },
  {
    component: Forbiden,
    path: routes.forbiden,
  },
  {
    component: emailRegister,
    path: routes.emailRegister,
    layout: AuthLayout,
  },
  {
    component: Register,
    path: routes.register,
    layout: AuthLayout,
  },
  {
    component: LoginPassword,
    path: routes.loginPassword,
    layout: AuthLayout,
  },
];

const privateRoutes: IRoute[] = [
  {
    component: Home,
    path: routes.home,
    layout: MainLayout,
    roles: [ROLES.Admin, ROLES.Employee],
  },
  {
    component: ManageTask,
    path: routes.manageTask,
    layout: MainLayout,
    roles: [ROLES.Admin, ROLES.Employee],
  },
  {
    component: ManagerEmployee,
    path: routes.manageEmployee,
    layout: MainLayout,
    roles: [ROLES.Admin],
  },
  {
    component: Message,
    path: routes.message,
    layout: MainLayout,
    roles: [ROLES.Admin, ROLES.Employee],
  },
];

export { publicRoutes, privateRoutes };
