import { useEffect, useState } from "react";
import { Board } from "../../types/Board";
import { getBoard, getStatuses } from "../../utils/apiUtils";
import Modal from "../common/Modal";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import AddStatus from "../common/AddStatus";
import { Status } from "../../types/Status";
import DeleteStatus from "./DeleteStatus";
import EditStatus from "./EditStatus";

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
    (status: Status) => status.description === `${board_id}`
  );
  filteredData.sort((a: Status, b: Status) => {
    if (a.id && b.id) {
      return a.id - b.id;
    }
    return 0;
  });
  setStatuses(filteredData);
};

export default function BoardUI(props: { board_id: number }) {
  const { board_id } = props;
  const [board, setBoard] = useState<Board>({} as Board);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [currentStatus, setCurrentStatus] = useState<Status>({
    id: 0,
    title: "",
    description: "",
  });

  // Modal States
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false);
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [deleteStatus, setDeleteStatus] = useState<boolean>(false);

  useEffect(() => {
    fetchBoard(board_id, setBoard);
    fetchStatuses(board_id, setStatuses);
  }, [board_id]);

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
        <div>
          <button
            className="bg-col1 p-2 m-2 rounded-md font-semibold w-24"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
          <button
            className="bg-col1 p-2 m-2 rounded-md font-semibold w-24"
            onClick={() => setDeleteBoard(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <button
          className="bg-col1 p-2 m-2 rounded-md font-semibold"
          onClick={() => setAddStatus(true)}
        >
          Add Status
        </button>
      </div>
      <div className="overflow-auto whitespace-nowrap">
        {statuses.map((status: Status) => (
          <div
            key={status.id}
            className="inline-block bg-col4 rounded-md p-4 m-2 min-w-[300px]"
          >
            <div className="flex">
              <p className="text-col1/70 text-lg">{status.title}</p>

              <button
                className="bg-col1 p-2 m-2 rounded-md font-semibold"
                onClick={() => {
                  if (status.id) {
                    setCurrentStatus(status);
                    setEditStatus(true);
                  }
                }}
              >
                Edit
              </button>
              <button
                className="bg-col1 p-2 m-2 rounded-md font-semibold"
                onClick={() => {
                  if (status.id) {
                    setCurrentStatus(status);
                    setDeleteStatus(true);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modals */}
      <Modal open={edit} closeCB={() => setEdit(false)}>
        <EditBoard board_id={board_id} board={board} />
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
      <Modal open={editStatus} closeCB={() => setEditStatus(false)}>
        <EditStatus status_id={currentStatus.id || 0} status={currentStatus} />
      </Modal>
      <Modal open={deleteStatus} closeCB={() => setDeleteStatus(false)}>
        <DeleteStatus
          status_id={currentStatus.id || 0}
          closeCB={() => setDeleteStatus(false)}
        />
      </Modal>
    </div>
  );
}
