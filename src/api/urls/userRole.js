import { request } from "../config/network";
export const getRolesByEmployeeId = (employeeId) =>
  request({ url: `getRolesByEmployeeId/${employeeId}`, method: "GET" });

export const createUserRole = (data) =>
  request({ url: `createUserRole`, method: "POST", data });
