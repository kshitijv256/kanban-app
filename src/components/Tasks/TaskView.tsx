import { useEffect, useState } from "react";
import { Task } from "../../types/Task";
import { getTask } from "../../utils/apiUtils";
import editIcon from "../../assets/icons/edit.svg";
import trashIcon from "../../assets/icons/trash.svg";
import Modal from "../common/Modal";
import DeleteTask from "./Deletetask";
import EditTask from "./EditTask";

const fetchTask = async (
  board_id: number,
  task_id: number,
  setTask: (task: Task) => void
) => {
  const data = await getTask(board_id, task_id);
  setTask(data);
};

export default function TaskView(props: { id: number; board_id: number }) {
  const [task, setTask] = useState<Task | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchTask(props.board_id, props.id, setTask);
  }, [props.board_id, props.id]);

  if (!task) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-between items-center min-w-[30vw] bg-back2 m-10 p-6 rounded-md shadow-xl">
        <div className="w-full">
          <p className="bg-col3 rounded-br-md rounded-tl-md ml-[-24px] mt-[-24px] py-2 px-3 w-fit">
            {task.status_object?.title}
          </p>
          <div className="flex flex-col gap-2 w-full mt-2">
            <div className="flex justify-between w-full">
              <p className="text-3xl font-bold text-col1 capitalize">
                {task.title}
              </p>
              <div>
                <button
                  className="hover:bg-col2/20 rounded p-2 mx-1"
                  onClick={() => setShowEditModal(true)}
                >
                  <img src={editIcon} className="w-6" alt="edit" />
                </button>
                <button
                  className="hover:bg-col2/20 rounded p-2 mx-1"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <img src={trashIcon} className="w-6" alt="trash" />
                </button>
              </div>
            </div>
            <p className="text-2xl text-slate-300">{task.description}</p>
            <div className="rounded border-2 p-2 my-2 border-col3 text-col2">
              <p>Task ID: {task.id}</p>
              <p>Status: {task.status_object?.title}</p>
              <p>Board: {task.board_object?.title}</p>
            </div>
            <p className="text-xl text-gray-300 font-bold">
              Due Date: {task.due_date ? task.due_date.split("T")[0] : "None"}
            </p>
          </div>
        </div>
      </div>
      <Modal open={showEditModal} closeCB={() => setShowEditModal(false)}>
        <EditTask
          board_pk={props.board_id}
          task={task}
          setTaskCB={setTask}
          closeCB={() => setShowEditModal(false)}
        />
      </Modal>
      <Modal open={showDeleteModal} closeCB={() => setShowDeleteModal(false)}>
        <DeleteTask
          board_id={props.board_id}
          task_id={props.id}
          closeCB={() => setShowDeleteModal(false)}
        />
      </Modal>
    </div>
  );
}
