import { request } from "../config/network";
export const getRequestsFromRequestRoleFlow = (roleId) =>
  request({
    url: `/getRequestsFromRequestRoleFlow/${roleId}?pageNumber=1&pageSize=5`,
    method: "GET",
  });
export const setStateRequestRoleFlow = (roleId) =>
  request({
    url: `/setStateRequestRoleFlow/${roleId}`,
    method: "post",
  });
export const updateStateRequestRoleFlow = (workflowId, requisitionId, state) =>
  request({
    url: `/updateStateRequestRoleFlow/${workflowId}/${requisitionId}/${state}`,
    method: "post",
  });
