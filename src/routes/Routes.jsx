import Login from "../pages/Login/Login";
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
    title: "Login",
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
    title: "New Requisition",
  },
  {
    path: "/requisitions",
    element: <Requisitions />,
    title: "Requisitions",
  },
  {
    path: "/form",
    element: <Form />,
    title: "Form",
  },
  {
    path: "/rolesAdministration",
    element: <RolesAdministration />,
    title: "Roles Administration",
  },
  {
    path: "/validateCode",
    element: <ValidateCode />,
    title: "Validate Code",
  },
  {
    path: "/updatePassword",
    element: <UpdatePassword />,
    title: "Update Password",
  },
  {
    path: "/recoverPassword",
    element: <RecoverPassword />,
    title: "Recover Password",
  },
  {
    path: "/configurationDashboard",
    element: <ConfigurationDashboard />,
    title: "Configuration Dashboard",
  },
  {
    path: "/finance",
    element: <FinanceDashboard />,
    title: "Finance Dashboard",
  },
  {
    path: "/financeRequests",
    element: <FinanceRequest />,
    title: "Finance Requests",
  },
  {
    path: "/departmentMaintenance",
    element: <DepartmentMaintenance />,
    title: "Department Maintenance",
  },
  {
    path: "/payRoll",
    element: <PayrollDashboard />,
    title: "Payroll Dashboard",
  },
  {
    path: "/departmentAdministration",
    element: <DepartmentAdministration />,
    title: "Department Administration",
  },
  {
    path: "/payrollRequests",
    element: <PayrollRequest />,
    title: "Payroll Requests",
  },
  // Catch-all route - debe ir al final
  {
    path: "*",
    element: <Navigate to="/login" replace />,
    title: "Not Found",
  },
];
