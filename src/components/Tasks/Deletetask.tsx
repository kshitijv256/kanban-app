import { deleteTask } from "../../utils/apiUtils";

const removeTask = async (board_id: number, id: number) => {
  await deleteTask(board_id, id);
};

export default function DeleteTask(props: {
  board_id: number;
  task_id: number;
  closeCB: () => void;
}) {
  const handleClick = async (del: boolean) => {
    if (del) {
      await removeTask(props.board_id, props.task_id);
      window.location.reload();
    } else {
      props.closeCB();
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl text-col1 mb-2">
        Do you want to delete Task with ID: {props.task_id} ?
      </h1>
      <p className="text-gray-300 my-2 text-lg">
        This action cannot be undone.
      </p>
      <button
        onClick={() => handleClick(true)}
        className="bg-col1 p-2 m-2 rounded-md font-semibold w-24"
      >
        Yes
      </button>
      <button
        onClick={() => handleClick(false)}
        className="bg-col2 p-2 m-2 rounded-md font-semibold w-24"
      >
        No
      </button>
    </div>
  );
}
