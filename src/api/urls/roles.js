import { request } from "../config/network";
export const getRoles = () => request({ url: "/getRoles", method: "GET" });
export const deleteRoleById = (id) =>
  request({ url: `/deleteRoleById/${id}`, method: "DELETE" });
