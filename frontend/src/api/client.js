import axios from "axios";
import config from "../config";

const client = axios.create({
  baseURL: config.apiBaseUrl,
});

export default client;
