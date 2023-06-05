import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getTask } from "../utils/apiUtils";
import { Task } from "../types/Task";
import trashIcon from "../assets/icons/trash.svg";
import { Link } from "raviger";

const fetchTask = async (
  board_id: number,
  task_id: number,
  setTask: (task: Task) => void
) => {
  const data = await getTask(board_id, task_id);
  setTask(data);
};

export function Item(props: { id: string; board_id: number }) {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = props;

  useEffect(() => {
    fetchTask(props.board_id, parseInt(id), setTask);
  }, [props.board_id, id]);

  if (!task) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-col4 rounded p-2 m-2">
      <div className="text-xl font-bold text-col1">{task.title}</div>
      <div className="text-gray-200 text-base">{task.description}</div>
      <div className="text-gray-400 text-sm">
        Due Date: {task.due_date.split("T")[0]}
      </div>
    </div>
  );
}

export default function SortableItem(props: {
  id: string;
  board_id: number;
  deleteCB: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-start justify-center rounded-md m-2 bg-col4 min-h-14">
        <div className="flex justify-between w-full">
          <Link href={`/board/${props.board_id}/task/${props.id}`}>
            <Item id={props.id} board_id={props.board_id} />
          </Link>
          <div className="flex h-min">
            <button
              onClick={props.deleteCB}
              className="m-2 p-2 hover:bg-slate-500/50 rounded"
            >
              <img src={trashIcon} alt="trash" className="w-6" />
            </button>
            <button
              {...attributes}
              {...listeners}
              className="p-2 m-2 bg-slate-200/10 rounded w-10 h-10"
            >
              #
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
