import "./App.css";
import routes from "./routes/Routes";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { useState } from "react";

function App() {
  const location = useLocation().pathname;
  const [hiddenMenu, setHiddenMenu] = useState(false); // Estado para controlar el menú

  const pageRoutes = routes.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  // Determinar si el menú de navegación está visible
  const isNavVisible = location !== "/login";

  return (
    <>
      {location === "/login" ||
      location === "/register" ||
      location === "/updatePassword" ||
      location === "/recoverPassword" ||
      location === "/validateCode" ? null : (
        <Nav />
      )}
      {<Routes>{pageRoutes}</Routes>}
    </>
  );
}

export default App;
