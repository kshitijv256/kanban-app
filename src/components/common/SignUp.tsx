import { Link, navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { signup } from "../../utils/apiUtils";
import { NewUser, validateUser } from "../../types/User";
import { Error } from "../../types/common";

export default function SignUp() {
  const [newUser, setNewUser] = useState<NewUser>({
    username: "",
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState<Error<NewUser>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token", token);
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors = validateUser(newUser);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const data: NewUser = await signup(newUser);
        if (data) {
          console.log("Registered successfully");
          navigate(`/login`);
        }
      } catch (error) {
        errors = {
          ...errors,
          password1: "Password too common, Password must be alphanumeric",
        };
        setErrors(errors);
      }
    }
  };
  return (
    <div className="flex justify-center text-gray-800">
      <div>
        <h1 className="my-4 text-2xl font-bold text-col1">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-4">
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
                value={newUser.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">{errors.username}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        outline-none
                        focus:border-col2 focus:ring focus:ring-col2/70 focus:ring-opacity-50"
                placeholder="Username"
                value={newUser.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        outline-none
                        focus:border-col2 focus:ring focus:ring-col2/70 focus:ring-opacity-50"
                placeholder="Username"
                value={newUser.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password1"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password1"
                id="password1"
                className="mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        outline-none
                        focus:border-col2 focus:ring focus:ring-col2/70 focus:ring-opacity-50"
                placeholder="Password"
                value={newUser.password1}
                onChange={handleChange}
              />
              {errors.password1 && (
                <p className="text-red-500 text-xs italic">
                  {errors.password1}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password2"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                id="password2"
                className="mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        outline-none
                        focus:border-col2 focus:ring focus:ring-col2/70 focus:ring-opacity-50"
                placeholder="Password"
                value={newUser.password2}
                onChange={handleChange}
              />
              {errors.password2 && (
                <p className="text-red-500 text-xs italic">
                  {errors.password2}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-2 py-1.5 mt-2 rounded-md bg-col2/60 text-white hover:bg-col2"
            >
              Register
            </button>
          </div>
        </form>
        <Link href="/login" className="text-sm text-col2">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
