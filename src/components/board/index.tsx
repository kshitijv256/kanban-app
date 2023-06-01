import { useEffect, useState } from "react";
import { Board } from "../../types/Board";
import { getBoard } from "../../utils/apiUtils";

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

  useEffect(() => {
    fetchBoard(board_id, setBoard);
  }, [board_id]);

  return (
    <div className="bg-col1">
      <h1>Board {board_id}</h1>
      <p>{board.title}</p>
      <p>{board.description}</p>
    </div>
  );
}
