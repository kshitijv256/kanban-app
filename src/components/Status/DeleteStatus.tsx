import { deleteStatus } from "../../utils/apiUtils";

const removeStatus = async (id: number) => {
  await deleteStatus(id);
};

export default function DeleteStatus(props: {
  status_id: number;
  closeCB: () => void;
}) {
  const handleClick = async (del: boolean) => {
    if (del) {
      await removeStatus(props.status_id);
      window.location.reload();
    } else {
      props.closeCB();
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl text-col1 mb-2">
        Do you want to delete this status?
      </h1>
      <p className="text-gray-300 my-2 text-lg">
        This action cannot be undone.
      </p>
      <button
        onClick={() => handleClick(true)}
        className="bg-col1 p-2 m-2 rounded-md font-semibold w-24"
      >
        Yes
      </button>
      <button
        onClick={() => handleClick(false)}
        className="bg-col2 p-2 m-2 rounded-md font-semibold w-24"
      >
        No
      </button>
    </div>
  );
}
