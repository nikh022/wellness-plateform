import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend API URL
});

// Request interceptor to attach JWT token to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post("/login", formData);
export const register = (formData) => API.post("/register", formData);

export const fetchPublicSessions = () => API.get("/sessions");
export const fetchMySessions = () => API.get("/my-sessions");
export const fetchSession = (id) => API.get(`/my-sessions/${id}`);
export const saveDraft = (formData) =>
  API.post("/my-sessions/save-draft", formData);
export const publishSession = (id) => API.post(`/my-sessions/publish/${id}`);

export default API;
