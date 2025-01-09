console.log("process.env.REACT_APP_API_BASE_URL");

export default {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
};
