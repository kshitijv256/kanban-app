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

import addRowIcon from "../assets/icons/add-row.svg";
import editIcon from "../assets/icons/edit.svg";
import trashIcon from "../assets/icons/trash.svg";

const fetchStatus = async (
  status_id: number,
  setStatus: (status: Status) => void
) => {
  const data = await getStatus(status_id);
  setStatus(data);
};

export default function Container(props: {
  id: string;
  board_id: number;
  items: string[];
}) {
  const { id, items } = props;
  const [status, setStatus] = useState<Status>({} as Status);
  // const [currentTask, setCurrentTask] = useState<number>(0);

  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [deleteStatus, setDeleteStatus] = useState<boolean>(false);
  const [addTask, setAddTask] = useState<boolean>(false);
  // const [deleteTask, setDeleteTask] = useState<boolean>(false);

  const { setNodeRef } = useDroppable({
    id,
  });

  useEffect(() => {
    fetchStatus(Number(id), setStatus);
  }, [id]);

  return (
    <div className="inline-block">
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="bg-back2 rounded-md p-4 min-w-[400px] m-2 flex flex-col"
        >
          <div className="flex flex-row justify-between items-start mb-2">
            <div className="whitespace-break-spaces w-3/5">
              <p className="text-xl font-bold text-col2 capitalize">
                {status.title}
              </p>
              <p className="text-slate-400">{status.description}</p>
            </div>
            <div>
              <button
                className="hover:bg-col2/50 p-2 m-1 rounded-md"
                onClick={() => {
                  if (status.id) {
                    setEditStatus(true);
                  }
                }}
              >
                <img src={editIcon} alt="delete" className="w-6" />
              </button>
              <button
                className="hover:bg-col2/50 p-2 m-1 rounded-md"
                onClick={() => {
                  if (status.id) {
                    setDeleteStatus(true);
                  }
                }}
              >
                <img src={trashIcon} alt="delete" className="w-6" />
              </button>
              <button
                className="hover:bg-col2/50 p-2 m-1 rounded-md"
                onClick={() => {
                  if (status.id) {
                    setAddTask(true);
                  }
                }}
              >
                <img src={addRowIcon} alt="delete" className="w-6" />
              </button>
            </div>
          </div>
          <hr className="border-2 border-slate-600" />
          {items.map((id: string) => (
            <SortableItem
              key={id}
              id={id}
              board_id={props.board_id}
              // deleteCB={() => {
              //   setCurrentTask(Number(id));
              //   setDeleteTask(true);
              // }}
            />
          ))}
        </div>
      </SortableContext>
      <Modal open={editStatus} closeCB={() => setEditStatus(false)}>
        <EditStatus
          status_id={Number(id)}
          status={status}
          setStatusCB={setStatus}
          closeCB={() => setEditStatus(false)}
        />
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
      {/* <Modal open={deleteTask} closeCB={() => setDeleteTask(false)}>
        <DeleteTask
          board_id={status.board}
          task_id={currentTask || 0}
          closeCB={() => setDeleteTask(false)}
        />
      </Modal> */}
    </div>
  );
}
