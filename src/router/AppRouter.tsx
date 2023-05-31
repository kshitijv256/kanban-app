import React from "react";
import { useRoutes } from "raviger";
import Login from "../components/common/Login";
import NotFound from "../components/common/NotFound";

export default function AppRouter() {
  const routes = {
    "/": () => <div>Home</div>,
    "/login": () => <Login />,
    "*": () => <NotFound />,
  };
  const routeResult = useRoutes(routes);
  return routeResult;
}
