import React from "react";
import { useRoutes } from "raviger";
import Login from "../components/common/Login";
import NotFound from "../components/common/NotFound";
import Home from "../components/Home";

export default function AppRouter() {
  const routes = {
    "/": () => <Home />,
    "/login": () => <Login />,
    "*": () => <NotFound />,
  };
  const routeResult = useRoutes(routes);
  return routeResult;
}
