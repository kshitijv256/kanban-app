import React from "react";
import { useRoutes } from "raviger";
import Login from "../components/common/Login";
import NotFound from "../components/common/NotFound";
import Home from "../components/Home";
import { User } from "../types/User";
import SignUp from "../components/common/SignUp";

export default function AppRouter(props: { currentUser: User }) {
  const { currentUser } = props;
  const routes = {
    "/": () => <Home currentUser={currentUser} />,
    "/signup": () => <SignUp />,
    "/login": () => <Login />,
    "*": () => <NotFound />,
  };
  const routeResult = useRoutes(routes);
  return routeResult;
}
