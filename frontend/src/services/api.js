import axios from "axios";

const api = axios.create({
  baseURL: "https://api-tyh.herokuapp.com/",
});

export default api;
