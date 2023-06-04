import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Item } from "./SortableItem";
import Container from "./Container";
import { ItemsType } from "../types/common";
import { getTask, updateTask } from "../utils/apiUtils";
import { Task } from "../types/Task";

const updateTaskStatus = async (
  board_id: number,
  task_id: number,
  status_id: number
) => {
  const data: Task = await getTask(board_id, task_id);
  const newTask = { ...data, status: status_id };
  const res = await updateTask(board_id, task_id, newTask);
  return res;
};

export default function DnDComponent(props: {
  board_id: number;
  items: ItemsType;
}) {
  const [items, setItems] = useState<ItemsType>(props.items);
  const [activeId, setActiveId] = useState<string | null>();

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="flex">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {Object.keys(items).map((id: string) => (
          <Container
            key={id}
            id={id}
            board_id={props.board_id}
            items={items[id as keyof ItemsType]}
          />
        ))}
        <DragOverlay>
          {activeId ? <Item id={activeId} board_id={props.board_id} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function findContainer(id: string) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key: string) => {
      return items[key as keyof ItemsType].includes(id);
    });
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(`${id}`);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over || {};

    // Find the containers

    const activeContainer = findContainer(`${id}`);
    const overContainer = findContainer(`${overId}`);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }
    console.log(id, overId);
    console.log("active", activeContainer);
    console.log("over", overContainer);
    updateTaskStatus(
      props.board_id,
      parseInt(`${id}`),
      parseInt(overContainer)
    );

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(`${id}`);
      const overIndex = overItems.indexOf(`${overId}`);

      let newIndex;
      if (`${overId}` in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over || {};

    const activeContainer = findContainer(`${id}`);
    const overContainer = findContainer(`${overId}`);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(`${active.id}`);
    const overIndex = items[overContainer].indexOf(`${overId}`);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }
}
