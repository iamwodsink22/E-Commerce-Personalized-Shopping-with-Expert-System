import axios from "axios";

const axiosInstance = axios.create({baseURL: 'https://e-commerce-personalized-shopping-with-expert-system-t9j2.vercel.app/api'});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;