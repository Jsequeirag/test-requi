import { request } from "../config/network";
export const getData = (urls) => request({ url: urls, method: "GET" });
