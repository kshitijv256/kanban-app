import { Error } from "./common";

export type User = {
  name?: string;
  url?: string;
  username: string;
};

export type NewUser = {
  username: string;
  email: string;
  name?: string;
  password1: string;
  password2: string;
};

export const validateUser = (user: NewUser) => {
  const errors: Error<NewUser> = {};
  if (user.username.length < 1) {
    errors.username = "Username is required";
  }
  // write regex to check for valid username
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(user.username)) {
    errors.username = "Username must be alphanumeric";
  }

  if (user.username.length > 150) {
    errors.username = "Username should be less than 150 characters";
  }
  if (user.email.length < 1) {
    errors.email = "Email is required";
  }
  if (user.password1.length < 1) {
    errors.password1 = "Password is required";
  }
  if (user.password1.length < 8) {
    errors.password1 = "Password must be at least 8 characters long";
  }
  if (user.password2.length < 1) {
    errors.password2 = "Password confirmation is required";
  }
  if (user.password1 !== user.password2) {
    errors.password1 = "Passwords do not match";
    errors.password2 = "Passwords do not match";
  }
  return errors;
};
