import axios from "axios";
import hmacSHA256 from "crypto-js/hmac-sha256";

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const signature = hmacSHA256(
  process.env.REACT_APP_KEY,
  process.env.REACT_APP_PASSWORD
);

axiosApiInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("TOKEN");
  config.headers = {
    "access-key": signature,
  };
  if (token)
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application.json",
      "Content-Type": "application/json",
    };
  return config;
});

export default axiosApiInstance;
