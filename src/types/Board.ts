import { Error } from "./common";

export type Board = {
  id?: number;
  title: string;
  description: string;
};

export const validateBoard = (board: Board) => {
  const errors: Error<Board> = {};
  if (board.title.length < 1) {
    errors.title = "Title is required";
  }
  if (board.title.length > 100) {
    errors.title = "Title should be less than 100 characters";
  }
  if (board.description.length < 1) {
    errors.description = "Description is required";
  }
  return errors;
};
