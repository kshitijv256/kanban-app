import { Link } from "raviger";
import { Task } from "../../types/Task";

export default function ListTile(props: { task: Task }) {
  const { task } = props;

  return (
    <div className="m-2 p-4 bg-col3/80 hover:bg-col3 rounded-md border-4 border-col4 shadow-md">
      <Link href={`/board/${task.board}/task/${task.id}`}>
        <div className="text-col1 text-2xl font-semibold">{task.title}</div>
        <div>
          {task.due_date && (
            <div className="text-gray-300">
              Due Date:{" "}
              <span className="font-semibold">
                {task.due_date.split("T")[0]}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
