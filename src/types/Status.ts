import { Error } from "./common";

export type Status = {
  id?: number;
  title: string;
  description: string;
  board: number; // board id
};

export const validateStatus = (status: Status) => {
  const errors: Error<Status> = {};
  if (status.title.length < 1) {
    errors.title = "Title is required";
  }
  if (status.title.length > 100) {
    errors.title = "Title should be less than 100 characters";
  }
  if (status.description.length < 1) {
    errors.description = "Description is required";
  }
  return errors;
};
