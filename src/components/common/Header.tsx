import { Link } from "raviger";

export default function Header() {
  return (
    <div>
      <div className="flex p-2 gap-4">
        <Link href="/login">Login</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
