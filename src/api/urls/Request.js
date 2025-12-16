import { request } from "../config/network";
export const getRequestType = () =>
  request({ url: "/getRequestType", method: "GET" });

export const getRequisitionSubtypeByRequisitionTypeId = (RequisitionTypeId) =>
  request({
    url: `/getRequisitionSubtypeByRequisitionTypeId/${RequisitionTypeId}`,
    method: "GET",
  });
export const getRequestByUserId = (
  userId,
  pageNumber = 1,
  pageSize = 10,
  state = "",
  requestId = "",
  startDate = "",
  endDate = ""
) => {
  // Construimos la query string de forma dinámica
  const params = new URLSearchParams();

  params.append("pageNumber", pageNumber);
  params.append("pageSize", pageSize);

  if (state !== "") params.append("state", state);
  if (requestId !== "") params.append("requestId", requestId);
  if (startDate !== "") params.append("startDate", startDate);
  if (endDate !== "") params.append("endDate", endDate);

  // Construimos la URL final
  const url = `/getRequestByUserId/${userId}?${params.toString()}`;

  console.log("[getRequestByUserId] URL generada:", url);

  return request(url);
};

export const createRequests = (data) =>
  request({ url: "/createRequest", method: "POST", data });

export const draftRequest = (data) =>
  request({ url: "/draftRequest", method: "POST", data });

export const updateRequests = (data) =>
  request({ url: "/updateRequest", method: "POST", data });
export const updateRequisitionDetail = ({ data, requestRoleFlowDTO }) => {
  console.log("data:", data);
  console.log("requestRoleFlowDTO:", requestRoleFlowDTO);

  return request({
    url: "/updateRequisitionDetail",
    method: "POST",
    data: {
      data,
      requestRoleFlowDTO,
    },
  });
};
