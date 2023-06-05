import { useEffect, useState } from "react";
import { Board } from "../../types/Board";
import { getBoard, getStatuses, getTasks } from "../../utils/apiUtils";
import Modal from "../common/Modal";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import AddStatus from "../Status/AddStatus";
import { Status } from "../../types/Status";
import { Task } from "../../types/Task";
import { ItemsType } from "../../types/common";
import DnDComponent from "../../DnDComponent";
import addIcon from "../../assets/icons/add-col.svg";
import editIcon from "../../assets/icons/edit.svg";
import trashIcon from "../../assets/icons/trash.svg";

const fetchBoard = async (
  board_id: number,
  setBoard: (board: Board) => void
) => {
  const data = await getBoard(board_id);
  setBoard(data);
};

const fetchStatuses = async (
  board_id: number,
  setStatuses: (statuses: Status[]) => void
) => {
  const data = await getStatuses(100, 0);
  const filteredData = data.results.filter(
    (status: Status) => status.board === board_id
  );
  filteredData.sort((a: Status, b: Status) => {
    if (a.id && b.id) {
      return a.id - b.id;
    }
    return 0;
  });
  setStatuses(filteredData);
};

const fetchTasks = async (
  board_id: number,
  setTasks: (tasks: Task[]) => void
) => {
  const data = await getTasks(board_id, 100, 0);
  setTasks(data.results);
};

const filterTasksByStatus = (tasks: Task[], status_id: number) => {
  const filteredTasks = tasks.filter(
    (task: Task) => task.status_object?.id === status_id
  );
  return filteredTasks.map((task: Task) => `${task.id}`);
};

const filterTasks = (
  tasks: Task[],
  statuses: Status[],
  setItems: (items: ItemsType) => void
) => {
  let items: ItemsType = {};
  statuses.forEach((status: Status) => {
    items[`${status.id}`] = filterTasksByStatus(tasks, status.id || 0);
  });
  setItems(items);
};

export default function BoardUI(props: { board_id: number }) {
  const { board_id } = props;
  const [board, setBoard] = useState<Board>({} as Board);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [items, setItems] = useState<ItemsType | null>();

  // Modal States
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false);
  const [addStatus, setAddStatus] = useState<boolean>(false);

  useEffect(() => {
    fetchBoard(board_id, setBoard);
    fetchStatuses(board_id, setStatuses);
    fetchTasks(board_id, setTasks);
  }, [board_id]);

  useEffect(() => {
    if (tasks.length >= 0 && statuses.length > 0) {
      filterTasks(tasks, statuses, setItems);
    }
  }, [tasks, statuses]);

  return (
    <div className="text-white p-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold text-col1">Board ID: {board_id}</h1>
          <p className="mt-4 text-col2 text-2xl font-semibold">
            Title: {board.title}
          </p>
          <p className="text-col2/70 text-xl">
            Description: {board.description}
          </p>
        </div>
        <div className="flex h-min">
          <button
            className="p-2 m-2 hover:bg-col1/50 rounded"
            onClick={() => setEdit(true)}
          >
            <img src={editIcon} alt="edit" className="w-8" />
          </button>
          <button
            className="p-2 m-2 hover:bg-col1/50 rounded"
            onClick={() => setDeleteBoard(true)}
          >
            <img src={trashIcon} alt="delete" className="w-8" />
          </button>
        </div>
      </div>
      <hr className="border-back2 border-2 my-4" />
      <div className="flex items-center my-2">
        <p className="text-4xl text-gray-300 font-bold">Stages</p>
        <button
          className="rounded-md hover:bg-back2 p-2 ml-2"
          onClick={() => setAddStatus(true)}
        >
          <img src={addIcon} alt="add_status" className="w-10" />
        </button>
      </div>
      <div className="overflow-auto whitespace-nowrap w-full">
        {items && <DnDComponent board_id={board_id} items={items} />}
      </div>
      {/* Modals */}
      <Modal open={edit} closeCB={() => setEdit(false)}>
        <EditBoard
          board_id={board_id}
          board={board}
          setBoardCB={setBoard}
          closeCB={() => setEdit(false)}
        />
      </Modal>
      <Modal open={addStatus} closeCB={() => setAddStatus(false)}>
        <AddStatus board_id={board_id} />
      </Modal>
      <Modal open={deleteBoard} closeCB={() => setDeleteBoard(false)}>
        <DeleteBoard
          board_id={board_id}
          closeCB={() => setDeleteBoard(false)}
        />
      </Modal>
    </div>
  );
}
