import { request } from "../config/network";
export const getDepartmentByEmployeeId = async (employeeId) =>
  await request({
    url: `getDepartmentByEmployeeId/${employeeId}`,
    method: "GET",
  });
export const createUserDepartment = async (data) =>
  await request({
    url: `createUserDepartment`,
    method: "POST",
    data,
  });
