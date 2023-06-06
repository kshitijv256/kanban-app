import { useState, useEffect } from "react";
import { User } from "../../types/User";
import Modal from "../common/Modal";
import CreateBoard from "./CreateBoard";
import { getBoards } from "../../utils/apiUtils";
import { Board } from "../../types/Board";
import { Link } from "raviger";

const fetchBoards = async (setBoards: (value: Board[]) => void) => {
  const data = await getBoards(10, 0);
  setBoards(data.results);
};

export default function Home(props: { currentUser: User }) {
  const { currentUser } = props;
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoard, setNewBoard] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser.username.length > 0) {
      fetchBoards(setBoards);
    }
  }, [currentUser]);

  if (currentUser.username.length === 0) {
    return (
      <div className="w-full text-center">
        <h1 className="text-2xl">Hello, Guest</h1>
        <p>Please login to continue</p>
        <div className="mt-4">
          <Link
            href="/signup"
            className="bg-col2/70 hover:bg-col2 rounded p-2 mr-4"
          >
            Sign Up
          </Link>
          <Link href="/login" className="bg-col3/70 hover:bg-col3 rounded p-2">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl">
        Hello, {currentUser.name ? currentUser.name : currentUser.username}
      </h1>
      <button
        onClick={() => setNewBoard(true)}
        className="bg-col1 rounded p-2 my-2"
      >
        Add board
      </button>
      <div className="flex gap-4 p-4 w-full">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            className="bg-col2/70 hover:bg-col2/80 rounded p-2 w-[200px]"
          >
            {board.title}
            <br />
            {board.description}
          </Link>
        ))}
      </div>
      <Modal open={newBoard} closeCB={() => setNewBoard(false)}>
        <CreateBoard />
      </Modal>
    </div>
  );
}
