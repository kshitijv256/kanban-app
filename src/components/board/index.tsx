import { useEffect, useState } from "react";
import { Board } from "../../types/Board";
import { getBoard } from "../../utils/apiUtils";
import Modal from "../common/Modal";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";

const fetchBoard = async (
  board_id: number,
  setBoard: (board: Board) => void
) => {
  const data = await getBoard(board_id);
  setBoard(data);
};

export default function BoardUI(props: { board_id: number }) {
  const { board_id } = props;
  const [board, setBoard] = useState<Board>({} as Board);
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false);

  useEffect(() => {
    fetchBoard(board_id, setBoard);
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
      <Modal open={edit} closeCB={() => setEdit(false)}>
        <EditBoard board_id={board_id} board={board} />
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
