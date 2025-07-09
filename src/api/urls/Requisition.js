import { request } from "../config/network";
export const GetRequisitionTypeByRequestTypeId = (requestTypeId) =>
  request({
    url: `/getRequisitionTypeByRequestTypeId/${requestTypeId}`,
    method: "GET",
  });
