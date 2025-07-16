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

import Login from "./pages/Login/Login";

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
    <>
      {!isAuthRoute && ispermitRoute && <Nav />}
      {!isAuthRoute && ispermitRoute && <Topnav />}
      <Routes>
        <Route element={<LoginSaved />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        {pageRoutes}
      </Routes>
    </>
  );
}

export default App;
