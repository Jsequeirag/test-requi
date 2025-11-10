import { request } from "../config/network";
export const GetRequisitionTypeByRequestTypeId = (requestTypeId) =>
  request({
    url: `/getRequisitionTypeByRequestTypeId/${requestTypeId}`,
    method: "GET",
  });
export const GetRequisitionById = (requisitionId) =>
  request({
    url: `/getRequisitionById?requisitionId=${requisitionId}`,
    method: "GET",
  });
