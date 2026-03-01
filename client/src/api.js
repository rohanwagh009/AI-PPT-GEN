import axios from "axios";

// 📡 This line checks: "Is there a live URL? If not, use localhost."
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
