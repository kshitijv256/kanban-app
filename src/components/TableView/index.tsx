import React, { useEffect, useState } from "react";
import { Task } from "../../types/Task";
import { getTasks } from "../../utils/apiUtils";
import { Link } from "raviger";

const fetchTasks = async (
  board_id: number,
  setTasks: (tasks: Task[]) => void
) => {
  const data = await getTasks(board_id, 100, 0);
  setTasks(data.results);
};

export default function TableView(props: { board_id: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks(props.board_id, setTasks);
  }, [props.board_id]);
  return (
    <div>
      <h1 className="text-col2 text-3xl m-6 font-bold">Table View</h1>
      <div className="flex flex-row flex-wrap gap-10 mx-6">
        {tasks.map((task: Task) => {
          return (
            <Link href={`/board/${task.board}/task/${task.id}`}>
              <div
                key={task.id}
                className="bg-back2 flex flex-col gap-4 p-4 rounded-md w-80 h-full"
              >
                <div className="text-2xl font-bold text-col1 capitalize">
                  {task.title}
                </div>
                <div className="text-lg text-gray-300">{task.description}</div>
                <div className="flex w-full justify-between">
                  <span className="text-gray-400">Due Date: </span>
                  <span className="font-semibold">
                    {task.due_date.split("T")[0]}
                  </span>
                </div>
                <div className="flex w-full justify-between">
                  <span className="text-gray-400 pr-8">Status:</span>{" "}
                  <span className="font-semibold overflow-clip">
                    {task.status_object?.title}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
