import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api/v1", // ✅ adjust if backend uses different port
});

export default apiClient;


// http://localhost:4000/api/v1