// const API_BASE_URL = "https://tsapi.coronasafe.xyz/api/";
const API_BASE_URL = "http://127.0.0.1:8000/api/";

type requestType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const request = async (
  endpoint: string,
  method: requestType = "GET",
  data: any = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";

    url = `${API_BASE_URL}${endpoint}?${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : undefined,
  });
  if (response.ok) {
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return {};
    }
  } else if (response.status === 400) {
    const error = await response.json();
    throw error;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

// user related api calls
export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const signup = (data: any) => {
  return request("auth/registration/", "POST", data);
};

export const me = () => {
  return request("users/me/", "GET");
};

// board related api calls
export const createBoard = (data: any) => {
  return request("boards/", "POST", data);
};

export const getBoards = (limit: number, offset: number) => {
  return request("boards/", "GET", { limit, offset });
};

export const getBoard = (id: number) => {
  return request(`boards/${id}/`, "GET");
};

export const updateBoard = (id: number, data: any) => {
  return request(`boards/${id}/`, "PUT", data);
};

export const deleteBoard = (id: number) => {
  return request(`boards/${id}/`, "DELETE");
};

// status related api calls
export const createStatus = (data: any) => {
  return request("status/", "POST", data);
};

export const getStatuses = (limit: number, offset: number) => {
  return request("status/", "GET", { limit, offset });
};

export const getStatus = (id: number) => {
  return request(`status/${id}/`, "GET");
};

export const updateStatus = (id: number, data: any) => {
  return request(`status/${id}/`, "PUT", data);
};

export const deleteStatus = (id: number) => {
  return request(`status/${id}/`, "DELETE");
};

// task related api calls
export const createTask = (board_pk: number, data: any) => {
  return request(`boards/${board_pk}/tasks/`, "POST", data);
};

export const getTasks = (board_pk: number, limit: number, offset: number) => {
  return request(`boards/${board_pk}/tasks/`, "GET", { limit, offset });
};

export const getTask = (board_pk: number, id: number) => {
  return request(`boards/${board_pk}/tasks/${id}/`, "GET");
};

export const updateTask = (board_pk: number, id: number, data: any) => {
  return request(`boards/${board_pk}/tasks/${id}/`, "PUT", data);
};

export const deleteTask = (board_pk: number, id: number) => {
  return request(`boards/${board_pk}/tasks/${id}/`, "DELETE");
};
