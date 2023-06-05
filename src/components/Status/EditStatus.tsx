import { useState } from "react";
import { Status, validateStatus } from "../../types/Status";
import { Error } from "../../types/common";
import { updateStatus } from "../../utils/apiUtils";

export default function EditStatus(props: {
  status_id: number;
  status: Status;
  setStatusCB: (status: Status) => void;
  closeCB: () => void;
}) {
  const [status, setStatus] = useState<Status>(props.status);
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
        const data = await updateStatus(props.status_id, status);
        if (data) {
          console.log("Status updated successfully");
          props.setStatusCB(data);
          props.closeCB();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-col4">
      <h1 className="text-2xl font-bold text-col1">Edit Status</h1>
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
            placeholder="Status Description"
            value={status.description}
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
