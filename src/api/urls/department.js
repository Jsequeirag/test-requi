import { request } from "../config/network";
export const getDepartments = async () =>
  await request({ url: `/getDepartments`, method: "GET" });

export const updateInfoDepartments = async () =>
  await request({ url: `/updateInfoDepartments`, method: "PUT" });
