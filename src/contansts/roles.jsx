export const Role = Object.freeze({
  Supervisor: 1,
  Reclutamiento: 2,
  Finanzas: 5,
  Payroll: 6,
  Activos: 7,
  HumanCapital: 8,
  MDM: 9,
  IT: 10,
  Asolion: 11,
  SuperAdmin: 12,
  IMAC: 13,
  Facilities: 14,
});

export const RoleName = {
  [Role.Supervisor]: "Supervisor",
  [Role.Reclutamiento]: "Reclutamiento",
  [Role.Finanzas]: "Finanzas",
  [Role.Payroll]: "Payroll",
  [Role.Activos]: "Activos",
  [Role.HumanCapital]: "Capital Humano",
  [Role.MDM]: "MDM",
  [Role.IT]: "IT",
  [Role.Asolion]: "Asolion",
  [Role.SuperAdmin]: "Super Administrador",
  [Role.IMAC]: "IMAC",
  [Role.Facilities]: "Facilities",
};
