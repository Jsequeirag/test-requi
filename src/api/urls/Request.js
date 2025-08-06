import { request } from "../config/network";
export const getRequestType = () =>
  request({ url: "/getRequestType", method: "GET" });

export const getRequisitionSubtypeByRequisitionTypeId = (RequisitionTypeId) =>
  request({
    url: `/getRequisitionSubtypeByRequisitionTypeId?RequisitionTypeId=${RequisitionTypeId}`,
    method: "GET",
  });
export const getRequestByUserId = (userId, pageNumber = 1, pageSize = 10) =>
  request(
    `/getRequestByUserId/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

export const createRequests = (data) =>
  request({ url: "/createRequest", method: "POST", data });
export const updateRequests = (data) =>
  request({ url: "/updateRequest", method: "POST", data });
