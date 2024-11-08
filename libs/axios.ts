import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL, // 기본 URL 설정
});

export default axiosInstance;
