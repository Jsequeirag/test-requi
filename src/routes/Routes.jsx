import Login from "../pages/Login/Login";

import RecoverPassword from "../pages/Auth/RecoverPassword";
import Home from "../pages/Home/Home";
import RolesAdministration from "../pages/RolesAdministration/RolesAdministration";
import { Navigate } from "react-router-dom";
import Form from "../pages/ExampleFormik/Form";
import Register from "../pages/Auth/Register";
import ValidateCode from "../pages/Auth/ValidateCode";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import NewRequisition from "../pages/NewRequisition/NewRequisition";
import Requisitions from "../pages/Requisitions/Requisitions";
import ConfigurationDashboard from "../pages/ConfigurationDashboard/ConfigurationDashboard";
import PayrollDashboard from "../pages/PayrollDashboard/PayrollDashboard";
import FinanceDashboard from "../pages/FinanceDashboard/FinanceDashboard";
import DepartmentMaintenance from "../pages/Maintenance/DepartmentMaintenance";
import DepartmentAdministration from "../pages/DepartmentAdministration/DepartmentAdministration";
import PayrollRequest from "../pages/PayrollDashboard/PayrollRequest";
import FinanceSidebar from "../pages/FinanceDashboard/FinanceSidebar";
import FinanceRequest from "../pages/FinanceDashboard/FinanceRequest";
//https://dev.to/kachiic/the-right-way-structure-your-react-router-1i3l
export default [
  {
    path: "login",
    element: <Login />,
    title: "Login",
  },
  {
    path: "register",
    element: <Register />,
    title: "register",
  },

  {
    path: "home",
    element: <Home />,
    title: "Home",
  },
  {
    path: "newRequisition",
    element: <NewRequisition />,
    title: "newRequisition",
  },
  {
    path: "requisitions",
    element: <Requisitions />,
    title: "Requisitions",
  },
  {
    path: "form",
    element: <Form />,
    title: "form",
  },
  {
    path: "rolesAdministration",
    element: <RolesAdministration />,
    title: "rolesAdministration",
  },
  {
    path: "validateCode",
    element: <ValidateCode />,
    title: "validateCode",
  },
  {
    path: "updatePassword",
    element: <UpdatePassword />,
    title: "updatePassword",
  },
  {
    path: "recoverPassword",
    element: <RecoverPassword />,
    title: "recoverPassword",
  },
  {
    path: "configurationDashboard",
    element: <ConfigurationDashboard />,
    title: "configurationDashboard",
  },
  {
    path: "finance",
    element: <FinanceDashboard />,
    title: "finance",
  },
  {
    path: "FinanceRequests",
    element: <FinanceRequest />,
    title: "finance",
  },
  {
    path: "departmentMaintenance",
    element: <DepartmentMaintenance />,
    title: "departmentMaintenance",
  },
  {
    path: "payRoll",
    element: <PayrollDashboard />,
    title: "payRoll",
  },
  {
    path: "departmentAdministration",
    element: <DepartmentAdministration />,
    title: "departmentAdministration",
  },
  {
    path: "payrollRequests",
    element: <PayrollRequest />,
    title: "payrollRequests",
  },
  {
    path: "*",
    element: <Navigate to="/rolesAdministration" replace />,
    title: "Login",
  },
];
