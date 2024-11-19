import axios from "axios";
import Storage from "./storage";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiCall = async (method = "GET", endpoint, data = null, config = {}) => {
  try {
    method = method.toUpperCase();
    config.headers = {
      Authorization: `Bearer ${Storage.getData("token")}`,
      ...config.headers,
    };
    const response = await api({
      url: endpoint,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        message: error.response.data.message || "Something went wrong",
        success: false,
      };
    } else if (error.request) {
      // No response received from server
      return { message: "No response from Server", success: false };
    } else {
      return { message: "Something went wrong", success: false };
    }
  }
};

export default apiCall;
