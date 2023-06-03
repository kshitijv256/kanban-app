import React, { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import Modal from "../components/common/Modal";
import EditStatus from "../components/Status/EditStatus";
import DeleteStatus from "../components/Status/DeleteStatus";
import { Status } from "../types/Status";
import { getStatus } from "../utils/apiUtils";
import AddTask from "../components/Tasks/AddTask";
import DeleteTask from "../components/Tasks/Deletetask";

// const containerStyle = {
//   background: "#dadada",
//   padding: 10,
//   margin: 10,
//   flex: 1,
// };

const fetchStatus = async (
  status_id: number,
  setStatus: (status: Status) => void
) => {
  const data = await getStatus(status_id);
  setStatus(data);
};

export default function Container(props: { id: any; items: string[] }) {
  const { id, items } = props;
  const [status, setStatus] = useState<Status>({} as Status);
  const [currentTask, setCurrentTask] = useState<number>(0);

  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [deleteStatus, setDeleteStatus] = useState<boolean>(false);
  const [addTask, setAddTask] = useState<boolean>(false);
  const [deleteTask, setDeleteTask] = useState<boolean>(false);

  const { setNodeRef } = useDroppable({
    id,
  });

  useEffect(() => {
    fetchStatus(Number(id), setStatus);
  }, [id]);

  return (
    <div>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="inline-block bg-back2 rounded-md p-4 m-2 min-w-[300px] w-fit"
        >
          {status.title}
          <div>
            <div>
              <button
                className="bg-col2 p-2 m-2 rounded-md font-semibold"
                onClick={() => {
                  if (status.id) {
                    setEditStatus(true);
                  }
                }}
              >
                Edit
              </button>
              <button
                className="bg-col2 p-2 m-2 rounded-md font-semibold"
                onClick={() => {
                  if (status.id) {
                    setDeleteStatus(true);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <button
            className="bg-col2 p-2 m-2 rounded-md font-semibold"
            onClick={() => {
              if (status.id) {
                setAddTask(true);
              }
            }}
          >
            Add Task
          </button>
          {items.map((id: string) => (
            <SortableItem
              key={id}
              id={id}
              deleteCB={() => {
                setCurrentTask(Number(id));
                setDeleteTask(true);
              }}
            />
          ))}
        </div>
      </SortableContext>
      <Modal open={editStatus} closeCB={() => setEditStatus(false)}>
        <EditStatus status_id={Number(id)} status={status} />
      </Modal>
      <Modal open={deleteStatus} closeCB={() => setDeleteStatus(false)}>
        <DeleteStatus
          status_id={Number(id)}
          closeCB={() => setDeleteStatus(false)}
        />
      </Modal>
      <Modal open={addTask} closeCB={() => setAddTask(false)}>
        <AddTask board_pk={status.board} status_id={Number(id)} />
      </Modal>
      <Modal open={deleteTask} closeCB={() => setDeleteTask(false)}>
        <DeleteTask
          board_id={status.board}
          task_id={currentTask || 0}
          closeCB={() => setDeleteTask(false)}
        />
      </Modal>
    </div>
  );
}
