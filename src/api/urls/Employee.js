import { string } from "yup";
import { request } from "../config/network";
export const getEmployees = async () =>
  await request({ url: `/getEmployees`, method: "GET" });

export const getEmployeesbyBoss = async (employeeId) =>
  await request({
    url: `/getEmployeesByBoss?employeeId=${employeeId}`,
    method: "GET",
  });

export const getEmployeesBySupervisorRole = async () =>
  await request({
    url: `/getEmployeesBySupervisorRole`,
    method: "GET",
  });

export const getEmployeeById = async (id) =>
  await request({ url: `/getEmployeeById/${id}`, method: "GET" });
