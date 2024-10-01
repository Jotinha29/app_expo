import axios from "axios";

export const appVersao = "1.0.0";

//NOTE: IP changes on android or IOS, WARNING!
export const api = axios.create({
  baseURL: "http://172.20.10.3:3000",
});
