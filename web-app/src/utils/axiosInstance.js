import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: import.meta.env.SERVER_URL, // replace with your API base URL
  timeout: 8000, // set a timeout for requests
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers you need here
  },
});

// Response interceptor to handle responses and errors
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle the error based on response status or message
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // No response received from server
      console.error("Network Error:", error.request);
    } else {
      // Other errors (e.g., setup issues)
      console.error("Error:", error.message);
    }

    // Optionally, you can reject the error to catch it later
    return Promise.reject(error);
  }
);

// Function to make API calls with optional configuration
const apiCall = async (method = "GET", endpoint, data = null, config = {}) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.log("API Call Error:", error);
    throw error;
  }
};

export default apiCall;
