export const RequisitionState = Object.freeze({
  IN_PROGRESS: 0,
  DRAFT: 1,
  SENT: 2,
  APPROVED: 3,
  DENIED: 4,
  COMPLETED: 5,
  PENDING: 6,
});

/**
 * Mapa ID → Nombre legible (para UI)
 */
export const RequisitionStateName = {
  [RequisitionState.IN_PROGRESS]: "En progreso",
  [RequisitionState.DRAFT]: "Borrador",
  [RequisitionState.SENT]: "Enviada",
  [RequisitionState.APPROVED]: "Aprobada",
  [RequisitionState.DENIED]: "Denegada",
  [RequisitionState.COMPLETED]: "Completada",
  [RequisitionState.PENDING]: "Pendiente",
};

/**
 * Función: Recibe un ID (number) y retorna el nombre del estado
 * Si no existe, retorna "Desconocido"
 */
export const getRequisitionStateName = (id) => {
  return RequisitionStateName[id] ?? "Desconocido";
};
