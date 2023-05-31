import { Link } from "raviger";
import { User } from "../../types/User";

export default function Header(props: { currentUser: User }) {
  return (
    <div>
      <div className="flex p-2 gap-4">
        {props.currentUser.username.length > 0 ? (
          <p>Hello, {props.currentUser.username}</p>
        ) : null}
        <Link href="/login">Login</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
