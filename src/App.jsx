import "./App.css";
import routes from "./routes/Routes";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Topnav from "./components/Nav/Topnav";
import { useState } from "react";

function App() {
  const location = useLocation();
  const [hiddenMenu, setHiddenMenu] = useState(false);

  // Rutas donde NO se debe mostrar el Nav
  const authRoutes = [
    "/login",
    "/register",
    "/updatePassword",
    "/recoverPassword",
    "/validateCode",
  ];

  // Verificar si la ruta actual es una ruta de autenticación
  const isAuthRoute = authRoutes.includes(location.pathname);

  // Generar las rutas desde la configuración
  const pageRoutes = routes.map(({ path, title, element }) => {
    return <Route key={title} path={path} element={element} />;
  });

  return (
    <>
      {/* Mostrar Nav solo si NO es una ruta de autenticación */}
      {!isAuthRoute && <Nav />}
      {!isAuthRoute && <Topnav />}
      <Routes>{pageRoutes}</Routes>
    </>
  );
}

export default App;
