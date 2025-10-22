// src/constants/requestType.js
export const RequestType = Object.freeze({
  Salida: 1,
  Entrada: 2,
  Promocion: 3,
  MovimientoLateral: 4,
  CierreDePlaza: 5,
});

export const RequestTypeName = {
  [RequestType.Salida]: "Salida",
  [RequestType.Entrada]: "Entrada",
  [RequestType.Promocion]: "Promoción",
  [RequestType.MovimientoLateral]: "Movimiento lateral",
  [RequestType.CierreDePlaza]: "Cierre de plaza",
};
