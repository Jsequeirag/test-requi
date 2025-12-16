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

// Traducción desde el nombre usado en navRoleConfig → ID de rol
export const RoleKeyMap = {
  supervisor: 1,
  reclutamiento: 2,
  finanzas: 5,
  payroll: 6,
  humancapital: 8,
  superadmin: 12,
};

// Roles que pueden tener notificaciones (todos los roles definidos)
export const NotifiableRoles = Object.values(Role);

// Devuelve un objeto:
// { roleId: { hasNotification: boolean, count: number } }
export function getRoleNotifications(requisitions = []) {
  const notifications = {};

  // Inicializamos todos los roles con count=0
  NotifiableRoles.forEach((roleId) => {
    notifications[roleId] = { hasNotification: false, count: 0 };
  });

  // Contar ocurrencias por roleId
  requisitions.forEach((req) => {
    const roleId = req.roleId;

    if (notifications[roleId]) {
      notifications[roleId].count++;
      notifications[roleId].hasNotification = true;
    }
  });

  return notifications;
}
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
export const ActiveMenuRoles = [
  "supervisor",
  "reclutamiento",
  "superadmin",
  "finanzas",
  "payroll",
  "humancapital",
];
