import React from "react";
import { LoginComponent } from "../components/login/LoginComponent";
import Messages from "../components/messages-component/Messages";
import Home from "../components/home-component/Home";
import Profile from "../components/profile-component/Profile";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
];
