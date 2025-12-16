import { Role } from "../contansts/roles";
export const EMPLOYEE_MATRIX_CE3 = {
  // Líder del Equipo
  positionCode: { [Role.LiderEquipo]: true },
  supervisor: { [Role.LiderEquipo]: true },
  grade: { [Role.LiderEquipo]: true },
  project: { [Role.LiderEquipo]: true },
  areaName: { [Role.LiderEquipo]: true },
  comment: { [Role.LiderEquipo]: true },

  // Reclutamiento
  fullName: { [Role.Reclutamiento]: true },
  startDate: { [Role.Reclutamiento]: true },

  // Human Capital
  careerSettingsId: { [Role.HumanCapital]: true },
  lionLogin: { [Role.HumanCapital]: true },
  companyEmail: { [Role.HumanCapital]: true },

  // Payroll
  exactusId: { [Role.Payroll]: true },

  // Centro de costo → Automático (nadie edita)
};
export const EMPLOYEE_MATRIX_CE8 = {
  // Líder del Equipo
  positionCode: { [Role.LiderEquipo]: true },
  supervisor: { [Role.LiderEquipo]: true },
  grade: { [Role.LiderEquipo]: true },
  project: { [Role.LiderEquipo]: true },
  areaName: { [Role.LiderEquipo]: true },
  comment: { [Role.LiderEquipo]: true },

  // Reclutamiento
  fullName: { [Role.Reclutamiento]: true },
  startDate: { [Role.Reclutamiento]: true },
  endDate: { [Role.Reclutamiento]: true },

  // Human Capital
  careerSettingsId: { [Role.HumanCapital]: true },
  lionLogin: { [Role.HumanCapital]: true },
  companyEmail: { [Role.HumanCapital]: true },

  // Payroll
  exactusId: { [Role.Payroll]: true },

  // Centro de costo → Automático (nadie edita)
};
