import { Board } from "./Board";
import { Status } from "./Status";
import { Error } from "./common";

export type Task = {
  id?: number;
  board_object?: Board;
  status_object?: Status;
  status: number; // status id
  title: string;
  description: string;
  due_date: string;
  board?: number; // board id
};

export const validateTask = (task: Task) => {
  const errors: Error<Task> = {};
  if (task.title.length < 1) {
    errors.title = "Title is required";
  }
  if (task.title.length > 100) {
    errors.title = "Title should be less than 100 characters";
  }
  if (task.description.length < 1) {
    errors.description = "Description is required";
  }
  if (Date.parse(task.due_date) < Date.now() - 86400000) {
    errors.due_date = "Due date should be in the future";
  }
  return errors;
};
