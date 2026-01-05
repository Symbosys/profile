import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: "https://escort-kappa.vercel.app/api/v1",
  timeout: 10000, // optional (10s timeout)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


// https://escort-kappa.vercel.app