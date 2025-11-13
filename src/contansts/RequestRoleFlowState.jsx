export const RequestRoleFlow = Object.freeze({
  REGISTERED: 0,
  INPROGRESS: 1,
  DENIED: 2,
  COMPLETED: 3,
  PENDING: 4,
});

export const RequestRoleFlowName = {
  [RequestRoleFlow.REGISTERED]: "Registrado",
  [RequestRoleFlow.INPROGRESS]: "En progreso",
  [RequestRoleFlow.DENIED]: "Denegado",
  [RequestRoleFlow.COMPLETED]: "Completado",
  [RequestRoleFlow.PENDING]: "Pendiente",
};
export const getRequestRoleFlowName = (id) => {
  return RequestRoleFlowName[id] ?? "Desconocido";
};
