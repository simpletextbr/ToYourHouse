import axios from "axios";

const api = axios.create({
  baseURL: "https://api-tyh-com-br.umbler.net",
});

export default api;
