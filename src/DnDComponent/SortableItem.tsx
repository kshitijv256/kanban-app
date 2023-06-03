import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props: { id: string }) {
  const { id } = props;

  return <div className="bg-col3 rounded p-2 m-2">Task ID: {id}</div>;
}

export default function SortableItem(props: {
  id: string;
  deleteCB: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-center justify-center rounded-md m-2 p-2 bg-col3 h-14">
        <div className="flex justify-between w-full">
          <div>
            <Item id={props.id} />
          </div>
          <button
            onClick={props.deleteCB}
            className="bg-red-500/80 rounded m-3 p-2"
          >
            Delete
          </button>
          <button
            {...attributes}
            {...listeners}
            className="p-2 m-2 bg-slate-200/10 rounded"
          >
            #
          </button>
        </div>
      </div>
    </div>
  );
}
