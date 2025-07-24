import "./App.css";
import routes from "./routes/Routes";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Topnav from "./components/Nav/Topnav";

import Login from "./pages/Auth/Login/Login";

function App() {
  // Obtener la ruta actual y el usuario de localStorage
  let location = useLocation();

  const LoginSaved = ({ redirectPath = "/home" }) => {
    let storeUser =
      localStorage.getItem("requitool-employeeInfo") &&
      localStorage.getItem("requitool-roles") &&
      JSON.parse(localStorage.getItem("requitool-rememberSession"));

    if (storeUser) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  // Rutas donde NO se debe mostrar el Nav
  const authRoutes = [
    "/login",
    "/register",
    "/updatePassword",
    "/recoverPassword",
    "/validateCode",
  ];

  // Verificar si la ruta actual es una ruta de autenticación
  //No debe aparecer
  const isAuthRoute = authRoutes.includes(location.pathname);
  //debe aparecer
  const ispermitRoute = routes.some((route) =>
    route.path.includes(location.pathname)
  );
  // Generar las rutas desde la configuración
  const pageRoutes = routes.map(({ path, title, element }) => {
    return <Route key={title} path={path} element={element} />;
  });

  return (
    <div
      className="flex flex-col min-h-screen
                 relative overflow-hidden // Importante para manejar los elementos de fondo
                 bg-gray-200 dark:bg-gray-900/90"
    >
      {/* Elementos de fondo abstracto para añadir profundidad y movimiento */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-blue-700/30"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 dark:bg-red-700/30"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-sky-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:bg-sky-700/30"></div>

      {/* Contenido principal de la aplicación */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAuthRoute && ispermitRoute && <Nav />}
        {!isAuthRoute && ispermitRoute && <Topnav />}
        <Routes>
          <Route element={<LoginSaved />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          {pageRoutes}
        </Routes>
      </div>
    </div>
  );
}

export default App;
