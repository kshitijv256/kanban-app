import React, { useState } from "react";
import { Error } from "../../types/common";
import { updateTask } from "../../utils/apiUtils";
import { Task, validateTask } from "../../types/Task";

export default function EditTask(props: {
  board_pk: number;
  task: Task;
  setTaskCB: (task: Task) => void;
  closeCB: () => void;
}) {
  const [task, setTask] = useState<Task>(props.task);
  const [errors, setErrors] = useState<Error<Task>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateTask(task);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const newTask = {
          ...task,
          status: task.status_object?.id,
        };
        const data = await updateTask(props.board_pk, task.id || 0, newTask);
        if (data) {
          console.log("Task edited successfully");
          props.setTaskCB(data);
          props.closeCB();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg bg-col4">
      <h1 className="text-2xl font-bold text-col1">Edit Task</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-col2 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-col2 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="due_date"
            className="block text-col2 text-sm font-bold mb-2"
          >
            Due Date
          </label>
          <input
            type="datetime-local"
            name="due_date"
            id="due_date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={new Date(task.due_date).toISOString().slice(0, 16)}
            onChange={handleChange}
          />
          {errors.due_date && (
            <p className="text-red-500 text-xs italic">{errors.due_date}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-col1/90 hover:bg-col1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit Task
        </button>
      </form>
    </div>
  );
}
