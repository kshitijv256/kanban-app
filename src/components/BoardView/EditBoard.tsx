import { useState } from "react";
import { Board, validateBoard } from "../../types/Board";
import { Error } from "../../types/common";
import { updateBoard } from "../../utils/apiUtils";

export default function EditBoard(props: { board_id: number; board: Board }) {
  const [form, setForm] = useState<Board>(props.board);
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
        const data = await updateBoard(props.board_id, form);
        if (data) {
          console.log("Board updated successfully");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-col4">
      <h1 className="text-2xl font-bold text-col1">Edit Board</h1>
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
            type="text"
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
        <div className="flex items-center justify-between">
          <button
            className="bg-col1/90 hover:bg-col1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
