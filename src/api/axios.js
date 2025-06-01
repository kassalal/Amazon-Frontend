import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://amazon-backend-p9jg.onrender.com",
});
export { axiosInstance };
