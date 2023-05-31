import React from "react";
import { useRoutes } from "raviger";
import Login from "../components/common/Login";

export default function AppRouter() {
  const routes = {
    "/": () => <div>Home</div>,
    "/login": () => <Login />,
    "*": () => <div>Not Found</div>,
  };
  const routeResult = useRoutes(routes);
  return routeResult;
}
