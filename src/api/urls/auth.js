import { request } from "../config/network";
export const login = (data) => request({ url: "/login", method: "POST", data });
export const Register = (data) =>
  request({ url: "/Register", method: "POST", data });
export const updatePassword = (data) =>
  request({ url: "/updatePassword", method: "POST", data });
export const recoverPassword = (data) =>
  request({ url: "/recoverPassword", method: "POST", data });
