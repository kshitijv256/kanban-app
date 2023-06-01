import React, { useState } from "react";
import { navigate } from "raviger";
import { Error } from "../../types/common";
import { Board, validateBoard } from "../../types/Board";
import { createBoard } from "../../utils/apiUtils";

export default function CreateForm() {
  const [form, setForm] = useState<Board>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Error<Board>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateBoard(form);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const data = await createBoard(form);
        if (data) {
          console.log("Board created successfully");
          navigate(`/board/${data.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg bg-col4">
      <h1 className="text-2xl font-bold text-col1">Create Board</h1>
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
            placeholder="Board Title"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-col2 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            name="description"
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Board Description"
            value={form.description}
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
          Create
        </button>
      </form>
    </div>
  );
}
