import "./App.css";
import React, { useEffect } from "react";
import routes from "./routes/Routes";

import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Topnav from "./components/Nav/Topnav";
import Login from "./pages/Auth/Login/Login";

import { useApiGet } from "./api/config/customHooks";
import { GetRequestsRequestRoleFlowByPendingState } from "./api/urls/RequestRoleFlow";

import PendingRequisitionStore from "../stores/PendingRequisitionStore";
import LoadingModalLockScreen from "./components/LoadingModal/LoadingModalLockScreen";
import LoadingStore from "../stores/loadingStore"; // AJUSTA si el path es distinto

function App() {
  const location = useLocation();

  // Zustand stores
  const pendingRequisitionStore = PendingRequisitionStore();
  const loadingStore = LoadingStore();

  // Componente que evita entrar al login si tienes sesión guardada
  const LoginSaved = ({ redirectPath = "/home" }) => {
    const storeUser =
      localStorage.getItem("requitool-employeeInfo") &&
      localStorage.getItem("requitool-roles") &&
      JSON.parse(localStorage.getItem("requitool-rememberSession"));

    return storeUser ? <Navigate to={redirectPath} replace /> : <Outlet />;
  };

  // Rutas donde NO debe aparecer Nav / TopNav
  const authRoutes = [
    "/login",
    "/register",
    "/updatePassword",
    "/recoverPassword",
    "/validateCode",
  ];

  const isAuthRoute = authRoutes.includes(location.pathname);

  // ¿La ruta está registrada en routes?
  const isPermitRoute = routes.some((route) =>
    location.pathname.startsWith(route.path)
  );

  // Construcción de rutas dinámicas
  const pageRoutes = routes.map(({ path, title, element }) => (
    <Route key={title} path={path} element={element} />
  ));

  // API call
  const { data, isSuccess, isPending, isError } = useApiGet(
    ["requestsRequestRoleFlowByPendingState"],
    () => GetRequestsRequestRoleFlowByPendingState(),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  // 🔥 Aquí actualizamos el store de requisiciones + loading modal
  useEffect(() => {
    const allowedRoutes = [
      "/home",
      "/recruitment",
      "/configurationDashboard",
      "/finance",
      "/payroll",
      "/supervisor",
      "/humanCapital",
    ];

    // Si no está en una ruta permitida → No cargar nada
    if (!allowedRoutes.includes(location.pathname)) return;

    // Loading state
    loadingStore.setLoading(isPending);
    loadingStore.setMessage("Cargando requisiciones pendientes...");

    if (isSuccess && data) {
      pendingRequisitionStore.setRequisitions(data);
      loadingStore.setLoading(false);
    }

    if (isError) {
      loadingStore.setMessage("Error cargando requisiciones");
      loadingStore.setLoading(false);
    }
  }, [location.pathname, data, isSuccess, isPending, isError]);

  return (
    <div
      className="
        flex flex-col min-h-screen
        relative overflow-hidden
        bg-gray-200 dark:bg-gray-900/90
      "
    >
      {/* Fondos decorativos */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-300/30 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob dark:bg-blue-700/30" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-300/30 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000 dark:bg-red-700/30" />
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-sky-300/30 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-4000 dark:bg-sky-700/30" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAuthRoute && isPermitRoute && <Nav />}
        {!isAuthRoute && isPermitRoute && <Topnav />}

        {/* Loading global */}
        <LoadingModalLockScreen />

        <Routes>
          {/* Proteger login */}
          <Route element={<LoginSaved />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Rutas dinámicas */}
          {pageRoutes}
        </Routes>
      </div>
    </div>
  );
}

export default App;
