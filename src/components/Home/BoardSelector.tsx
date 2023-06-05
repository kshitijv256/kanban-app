import BoardUI from "../BoardView";
import ListView from "../ListView";

export default function BoardSelector(props: { board_id: number }) {
  let view = localStorage.getItem("view");
  if (view === "list") {
    return <ListView board_id={props.board_id} />;
  }
  if (view === "table") {
    return <div>Table View</div>;
  }
  return <BoardUI board_id={props.board_id} />;
}
