import { Link, navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { login } from "../../utils/apiUtils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token", token);
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="my-4 text-2xl font-bold text-col1">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        outline-none
                        focus:border-col2 focus:ring focus:ring-col2/70 focus:ring-opacity-50"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        outline-none
                        focus:border-col2 focus:ring focus:ring-col2/70 focus:ring-opacity-50"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="px-2 py-1.5 mt-2 rounded-md bg-col2/60 text-white hover:bg-col2"
            >
              Login
            </button>
          </div>
        </form>
        <Link href="/signup" className="text-sm text-col2">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
