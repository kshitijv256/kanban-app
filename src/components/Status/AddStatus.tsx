import React, { useState } from "react";
// import { navigate } from "raviger";
import { Error } from "../../types/common";
import { createStatus } from "../../utils/apiUtils";
import { Status, validateStatus } from "../../types/Status";

export default function AddStatus(props: { board_id: number }) {
  const [status, setStatus] = useState<Status>({
    title: "",
    description: "",
    board: props.board_id,
  });
  const [errors, setErrors] = useState<Error<Status>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStatus({ ...status, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateStatus(status);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const data = await createStatus(status);
        if (data) {
          console.log("Status created successfully");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg bg-col4">
      <h1 className="text-2xl font-bold text-col1">Create New Status</h1>
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
            placeholder="Status Title"
            value={status.title}
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
            placeholder="Status Description"
            value={status.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-col1/90 hover:bg-col1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Status
        </button>
      </form>
    </div>
  );
}
