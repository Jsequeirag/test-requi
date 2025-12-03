import Login from "../pages/Auth/Login/Login";
import RecoverPassword from "../pages/Auth/RecoverPassword";
import Supervisor from "../pages/RolePage/Supervisor/Supervisor";
import RolesAdministration from "../pages/RolesAdministration/RolesAdministration";

import { Navigate } from "react-router-dom";
import Form from "../pages/ExampleFormik/Form";
import Register from "../pages/Auth/Register";
import ValidateCode from "../pages/Auth/ValidateCode";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import NewRequisition from "../pages/NewRequisition/NewRequisition";
import InfoNewRequisition from "../pages/InfoRequisition/InfoNewRequisition.jsx";
import Requisitions from "../pages/Requisitions/Requisitions";
import ConfigurationDashboard from "../pages/ConfigurationDashboard/ConfigurationDashboard";

import DepartmentMaintenance from "../pages/Maintenance/DepartmentMaintenance";
import DepartmentAdministration from "../pages/DepartmentAdministration/DepartmentAdministration";

import PayrollDashboard from "../pages/RolePage/PayrollDashboard/PayrollDashboard";
import PayrollRequest from "../pages/RolePage/PayrollDashboard/PayrollRequest";

import FinanceDashboard from "../pages/RolePage/FinanceDashboard/FinanceDashboard";
import FinanceRequest from "../pages/RolePage/FinanceDashboard/FinanceRequest";

import RRHHDashboard from "../pages/RolePage/RRHHDashboard/RRHHDashboard";
import RRHHRequest from "../pages/RolePage/RRHHDashboard/RRHHRequest";

import RecluitmentDashboard from "../pages/RolePage/Recluitment/RecluitmentDashboard";
import RecluitmentRequest from "../pages/RolePage/Recluitment/RecluitmentRequest";

import SupervisorRequest from "../pages/RolePage/Supervisor/SupervisorRequest.jsx";
import Home from "../pages/Home/Home";
export default [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    title: "Root",
  },
  {
    path: "/home",
    element: <Home />,
    title: "home",
  },
  {
    path: "/login",
    element: <Login />,
    title: "login",
  },
  {
    path: "/register",
    element: <Register />,
    title: "Register",
  },
  {
    path: "/supervisor",
    element: <Supervisor />,
    title: "supervisor",
  },
  {
    path: "/newRequisition",
    element: <NewRequisition />,
    title: "newRequisition",
  },
  {
    path: "/requisitions",
    element: <Requisitions />,
    title: "requisitions",
  },
  {
    path: "/form",
    element: <Form />,
    title: "form",
  },
  {
    path: "/rolesAdministration",
    element: <RolesAdministration />,
    title: "rolesAdministration",
  },
  {
    path: "/validateCode",
    element: <ValidateCode />,
    title: "validateCode",
  },
  {
    path: "/updatePassword",
    element: <UpdatePassword />,
    title: "updatePassword",
  },
  {
    path: "/recoverPassword",
    element: <RecoverPassword />,
    title: "recoverPassword",
  },
  {
    path: "/configurationDashboard",
    element: <ConfigurationDashboard />,
    title: "configurationDashboard",
  },
  {
    path: "/finance",
    element: <FinanceDashboard />,
    title: "financeDashboard",
  },
  {
    path: "/financeRequests",
    element: <FinanceRequest />,
    title: "financeRequests",
  },

  {
    path: "/humanCapitalDashboard",
    element: <RRHHDashboard />,
    title: "hr",
  },
  {
    path: "/rrhhRequests",
    element: <RRHHRequest />,
    title: "rrhhRequests",
  },

  {
    path: "/recruitment",
    element: <RecluitmentDashboard />,
    title: "recruitment",
  },
  {
    path: "/recruitmentRequests",
    element: <RecluitmentRequest />,
    title: "recruitmentRequests",
  },

  {
    path: "/departmentMaintenance",
    element: <DepartmentMaintenance />,
    title: "departmentMaintenance",
  },
  {
    path: "/payRoll",
    element: <PayrollDashboard />,
    title: "payRoll",
  },
  {
    path: "/departmentAdministration",
    element: <DepartmentAdministration />,
    title: "departmentAdministration",
  },
  {
    path: "/payrollRequests",
    element: <PayrollRequest />,
    title: "payrollRequests",
  },
  {
    path: "/supervisorRequest",
    element: <SupervisorRequest />,
    title: "supervisorRequest",
  },
  {
    path: "/infoNewRequisition",
    element: <InfoNewRequisition />,
    title: "infoNewRequisition",
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
    title: "Not Found",
  },
];
