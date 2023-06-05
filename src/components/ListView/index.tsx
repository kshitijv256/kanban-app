import { useEffect, useState } from "react";
import { Board } from "../../types/Board";
import { getBoard, getStatuses, getTasks } from "../../utils/apiUtils";
import Modal from "../common/Modal";
import { Status } from "../../types/Status";
import { Task } from "../../types/Task";
import editIcon from "../../assets/icons/edit.svg";
import trashIcon from "../../assets/icons/trash.svg";
import ListTile from "../Tasks/ListTile";
import EditBoard from "../BoardView/EditBoard";
import DeleteBoard from "../BoardView/DeleteBoard";

type ListType = {
  [key: string]: Task[];
};

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
  return filteredTasks;
};

const filterTasks = (
  tasks: Task[],
  statuses: Status[],
  setItems: (items: ListType) => void
) => {
  let items: ListType = {};
  statuses.forEach((status: Status) => {
    items[`${status.id}`] = filterTasksByStatus(tasks, status.id || 0);
  });
  setItems(items);
};

export default function ListView(props: { board_id: number }) {
  const { board_id } = props;
  const [board, setBoard] = useState<Board>({} as Board);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [items, setItems] = useState<ListType | null>();

  // Modal States
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false);

  const [completed, setCompleted] = useState<Task[]>([]);

  useEffect(() => {
    const completed = localStorage.getItem("completed");
    if (completed) {
      setCompleted(JSON.parse(completed));
    }
  }, []);

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
    <div className="text-white p-4 w-full flex flex-col items-center">
      <div className="flex justify-between w-full">
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
      <hr className="border-back2 border-2 my-4 w-full" />
      <div className="flex items-center my-2 w-full">
        <p className="text-4xl text-gray-300 font-bold">Tasks</p>
      </div>
      <div className="w-4/12 min-w-[300px]">
        <h1 className="text-gray-300">Ongoing</h1>
        {items &&
          Object.keys(items).map((id: string) => (
            <div key={id}>
              {items[id as keyof ListType].map((task: Task) => (
                <ListTile task={task} key={task.id} />
              ))}
            </div>
          ))}
        <div>
          <div className="flex">
            <h1 className="text-gray-300">Completed</h1>
            <button
              className="ml-2 p-2 rounded hover:bg-col1/50"
              onClick={() => {
                localStorage.setItem("completed", JSON.stringify([]));
                setCompleted([]);
              }}
            >
              Clear
            </button>
          </div>
          {completed.map((task: Task) => (
            <ListTile task={task} key={task.id} />
          ))}
        </div>
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
      <Modal open={deleteBoard} closeCB={() => setDeleteBoard(false)}>
        <DeleteBoard
          board_id={board_id}
          closeCB={() => setDeleteBoard(false)}
        />
      </Modal>
    </div>
  );
}
