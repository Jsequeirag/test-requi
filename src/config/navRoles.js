import {
  Users,
  Settings,
  Wallet,
  FileText,
  UserCheck,
  UserPlus,
  Home,
} from "lucide-react";

export const navRoleConfig = {
  home: {
    icon: Home,
    translationKey: "home",
    path: "/home",
  },

  reclutamiento: {
    icon: UserPlus,
    translationKey: "Recruitment",
    path: "/recruitment", // ✔ RUTA REAL
  },

  supervisor: {
    icon: Users,
    translationKey: "Supervisor",
    path: "/supervisor", // ✔ RUTA REAL
  },

  superadmin: {
    icon: Settings,
    translationKey: "SuperAdmin",
    path: "/configurationDashboard", // ✔ RUTA REAL
  },

  finanzas: {
    icon: Wallet,
    translationKey: "Finanzas",
    path: "/finance", // ✔ RUTA REAL
  },

  payroll: {
    icon: FileText,
    translationKey: "Payroll",
    path: "/payroll", // ✔ RUTA REAL
  },

  humancapital: {
    icon: UserCheck,
    translationKey: "Human Capital",
    path: "/humanCapital", // ✔ RUTA REAL
  },
};
