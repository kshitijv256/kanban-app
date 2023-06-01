import { useState } from "react";
import { User } from "../../types/User";
import Modal from "../common/Modal";

export default function Home(props: { currentUser: User }) {
  const { currentUser } = props;
  const [newBoard, setNewBoard] = useState<boolean>(false);
  return (
    <div>
      <h1 className="text-2xl">
        Hello, {currentUser.name ? currentUser.name : currentUser.username}
      </h1>
      <button onClick={() => setNewBoard(true)} className="bg-col1 rounded p-2">
        Add board
      </button>
      <Modal open={newBoard} closeCB={() => setNewBoard(false)}>
        <div></div>
      </Modal>
    </div>
  );
}
