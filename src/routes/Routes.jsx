import Login from "../pages/Auth/Login/Login";
import RecoverPassword from "../pages/Auth/RecoverPassword";
import Supervisor from "../pages/Supervisor/Supervisor";
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
  // Catch-all route - debe ir al final
  {
    path: "*",
    element: <Navigate to="/login" replace />,
    title: "Not Found",
  },
];
