import axios from "axios";

const api = axios.create({
  baseURL: "http://api-tyh-com-br.umbler.net/",
});

export default api;
