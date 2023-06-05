import { Task } from "../../types/Task";

export default function ListTile(props: { task: Task }) {
  const { task } = props;
  return (
    <div className="m-2 p-4 bg-col3 rounded shadow-md">
      <div className="text-col1 text-2xl font-semibold">{task.title}</div>
      <div>
        {task.due_date && (
          <div className="text-gray-300">
            Due Date:{" "}
            <span className="font-semibold">{task.due_date.split("T")[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
}
