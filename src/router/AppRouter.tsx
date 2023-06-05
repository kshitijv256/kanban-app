import React from "react";
import { useRoutes } from "raviger";
import Login from "../components/common/Login";
import NotFound from "../components/common/NotFound";
import Home from "../components/Home";
import { User } from "../types/User";
import SignUp from "../components/common/SignUp";
import TaskView from "../components/Tasks/TaskView";
import BoardSelector from "../components/Home/BoardSelector";

export default function AppRouter(props: { currentUser: User }) {
  const { currentUser } = props;
  const routes = {
    "/": () => <Home currentUser={currentUser} />,
    "/signup": () => <SignUp />,
    "/login": () => <Login />,
    "/board/:boardId": ({ boardId }: { boardId: string }) => (
      <BoardSelector board_id={Number(boardId)} />
    ),
    "/board/:boardId/task/:taskId": ({
      boardId,
      taskId,
    }: {
      boardId: string;
      taskId: string;
    }) => <TaskView board_id={Number(boardId)} id={Number(taskId)} />,
    "*": () => <NotFound />,
  };
  const routeResult = useRoutes(routes);
  return routeResult;
}
