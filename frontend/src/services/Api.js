import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    console.log("error status: ", status);
    console.log("error res: ", error?.response);

    if (status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/signin";
    }
  },
);

export const getExpense = () =>
  API.get("http://localhost:5000/api/expenses/get");
export const addExpense = (data) => API.post("/expenses", data);
// export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);

export const setBudget = (data) => API.post("/budget", data);
export const getBudget = () => API.get("/budget");
