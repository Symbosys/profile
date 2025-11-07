import axios from "axios";

const api = axios.create({
  baseURL: "https://escort-kappa.vercel.app/api",
  timeout: 10000, // optional (10s timeout)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


// https://escort-kappa.vercel.app