import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faRightFromBracket, // Logout
  faMoon, // Dark Mode
  faSun, // Light Mode
  faGauge, // Dashboard
  faArrowAltCircleRight, // Toggle menu
  faCog, // Configuraciones
  faFileInvoiceDollar, // Payroll
  faCoins, // Finanzas
  faUserGear,
  faHome,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  getLocalStorageKeyValue,
  saveLocalStorage,
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../utils/localstore";
import WebsiteConfig from "../../../stores/WebsiteConfig";
import ReactCountryFlag from "react-country-flag";
// Configuración de idiomas
const translations = {
  es: {
    inicio: "Inicio",
    supervisor: "Supervisor",
    payroll: "Nómina",
    finance: "Finanzas",
    administrator: "Administrador",
    logout: "Cerrar Sesión",
    darkMode: "Modo Oscuro",
    language: "Idioma",
    expandMenu: "Expandir menú",
    collapseMenu: "Contraer menú",
    userProfile: "Perfil de Usuario",
    dataAnalyst: "Analista de Datos",
    requitools: "Requitools",
  },
  en: {
    home: "Home",
    supervisor: "Supervisor",
    payroll: "Payroll",
    finance: "Finance",
    administrator: "Administrator",
    logout: "Logout",
    darkMode: "Dark Mode",
    language: "Language",
    expandMenu: "Expand menu",
    collapseMenu: "Collapse menu",
    userProfile: "User Profile",
    dataAnalyst: "Data Analyst",
    requitools: "Requitools",
  },
};

function NewNav() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState(() => {
    // Inicializar idioma desde localStorage o detectar navegador
    const storedLang = getLocalStorageItem("requi-language");
    if (storedLang) return storedLang;

    const browserLang = navigator.language.split("-")[0];
    return browserLang === "es" ? "es" : "en";
  });
  const [hiddenMenu, setHiddenMenu] = useState(() => {
    const storedShrink = getLocalStorageItem("requi-shrinkMenu");
    return storedShrink === "true";
  });
  const [roles, setRoles] = useState([]);
  const [hasNewPayrollRequests, setHasNewPayrollRequests] = useState(true);

  // Estado global
  const setShrinkMenu = WebsiteConfig((state) => state.setShrinkMenu);

  // Función para obtener traducciones
  const t = (key) => translations[language][key] || key;

  // Función para cambiar idioma
  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es";
    setLanguage(newLang);
    saveLocalStorage("requi-language", newLang);
  };

  // Función DarkModeSelected
  const DarkModeSeleted = () => {
    const html = document.documentElement;
    if (!darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  };

  // Efecto para cargar configuraciones iniciales
  useEffect(() => {
    // Cargar roles
    setRoles(JSON.parse(getLocalStorageItem("requitool-roles")) || []);

    // Cargar estado del menú
    const storedShrink = getLocalStorageItem("requi-shrinkMenu");
    const isMenuHiddenFromStorage = storedShrink
      ? storedShrink.trim().toLowerCase() === "true"
      : false;

    setHiddenMenu(isMenuHiddenFromStorage);
    setShrinkMenu(isMenuHiddenFromStorage);

    // Cargar idioma
    const storedLang = getLocalStorageItem("requi-language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  // Efecto para guardar preferencia de modo oscuro

  const handleLogout = () => {
    removeLocalStorageItem("requitool-employeeInfo");
    removeLocalStorageItem("requitool-roles");
    navigate("/login");
  };
  // Componente helper para elementos de navegación
  const NavItem = ({ icon, text, navigateTo, hasNotification = false }) => (
    <li
      className="nav-link relative h-12 flex items-center hover:bg-blue-100 rounded-lg
                 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer group"
    >
      <a
        className={`no-underline h-full w-full flex items-center
                    text-gray-700 dark:text-gray-300
                    hover:text-gr-700 dark:hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-300/50
                    active:scale-[0.98]
                    ${hiddenMenu ? "justify-center" : "justify-start"}`}
        onClick={() => navigate(navigateTo)}
        role="menuitem"
        tabIndex="0"
      >
        <FontAwesomeIcon
          icon={icon}
          className="min-w-[60px] flex items-center justify-center text-2xl
                     group-hover:text-blue-700 dark:group-hover:text-blue-400"
        />
        <span
          className={`text nav-text font-semibold whitespace-nowrap overflow-hidden
                      ${hiddenMenu ? "w-0 opacity-0" : "w-auto opacity-100"}
                      transition-all duration-200 delay-100`}
        >
          {text}
        </span>
        {hasNotification && (
          <span
            className={`absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full
                        ${hiddenMenu ? "left-[calc(50%+10px)]" : ""}
                        transition-all duration-200`}
          ></span>
        )}
      </a>

      {hiddenMenu && (
        <div
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-[100]
                     px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible
                     transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none
                     before:content-[''] before:absolute before:top-1/2 before:-left-1
                     before:-translate-y-1/2 before:border-4 before:border-transparent
                     before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
        >
          {text}
        </div>
      )}
    </li>
  );

  // Función para obtener inicial del usuario
  const getUserInitial = () => {
    const userName = getLocalStorageKeyValue("requitool-employeeInfo", "name");
    return userName ? userName.charAt(0).toUpperCase() : "U";
  };

  // Manejar toggle del menú
  const handleMenuToggle = () => {
    const newHiddenState = !hiddenMenu;
    setHiddenMenu(newHiddenState);
    saveLocalStorage("requi-shrinkMenu", newHiddenState.toString());
    setShrinkMenu(newHiddenState);
  };

  return (
    <nav
      className={`fixed top-0 left-0 h-full
        ${hiddenMenu ? "w-20" : "w-64"}
        bg-gray-50 dark:bg-gray-900/90
        backdrop-blur-xl shadow-lg
        px-4 py-6 transition-all duration-300 z-50
        border-r border-gray-200 dark:border-gray-800`}
    >
      <header className="sidebar text-gray-700 h-full flex flex-col">
        {/* Sección superior: Logo/Título y Perfil de Usuario */}
        <div className="flex flex-col items-center mb-6">
          {/* Logo/Título */}
          <div className="relative flex flex-col items-center justify-center mb-4 group">
            <img
              className="rounded-lg shadow-md bg-gray-100 "
              src="/assets/resourcesLogoXs.png"
              width={hiddenMenu ? 50 : 80}
              alt="logo"
              style={{ transition: "width 0.3s ease-in-out" }}
            />
            {/* Tooltip para el logo */}
            {hiddenMenu && (
              <div
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 
                              px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none
                              before:content-[''] before:absolute before:top-1/2 before:-left-1 
                              before:-translate-y-1/2 before:border-4 before:border-transparent 
                              before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
              >
                {t("requitools")}
              </div>
            )}
            {!hiddenMenu && (
              <h1 className="text-3xl font-bold ml-4 text-gray-900 dark:text-gray-300 whitespace-nowrap overflow-hidden">
                {t("requitools")}
              </h1>
            )}
          </div>

          {/* Perfil de Usuario */}
          <div
            className={`relative flex shadow-md bg-gray-100 group ${
              hiddenMenu && "justify-center"
            } items-center w-full p-2 rounded-lg
                            dark:bg-gray-800 transition-all duration-300`}
          >
            <span className="flex-shrink-0">
              <div
                className={`inline-flex items-center justify-center rounded-full bg-blue-500 text-white font-bold
                            ${
                              hiddenMenu
                                ? "w-10 h-10 text-xl"
                                : "w-12 h-12 text-2xl"
                            }
                            shadow-sm transition-all duration-300 `}
                style={{
                  transition:
                    "width 0.3s ease-in-out, height 0.3s ease-in-out ",
                }}
              >
                {getUserInitial()}
              </div>
            </span>
            {!hiddenMenu && (
              <div className="flex flex-col ml-3 overflow-hidden whitespace-nowrap">
                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {getLocalStorageKeyValue("requitool-employeeInfo", "name") ||
                    "User Name"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {t("dataAnalyst")}
                </span>
              </div>
            )}
            {/* Tooltip para el perfil de usuario */}
            {hiddenMenu && (
              <div
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 
                              px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none
                              before:content-[''] before:absolute before:top-1/2 before:-left-1 
                              before:-translate-y-1/2 before:border-4 before:border-transparent 
                              before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
              >
                {getLocalStorageKeyValue("requitool-employeeInfo", "name") ||
                  t("userProfile")}
              </div>
            )}
          </div>
        </div>

        {/* Botón Toggle para colapsar/expandir sidebar */}
        <div
          className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 flex items-center justify-center
                     bg-white dark:bg-gray-800 rounded-full shadow-md
                     border border-gray-200 dark:border-gray-700
                     cursor-pointer transition-all duration-300
                     hover:scale-110 active:scale-90 group"
          onClick={handleMenuToggle}
          role="button"
          aria-label={hiddenMenu ? t("expandMenu") : t("collapseMenu")}
        >
          <FontAwesomeIcon
            className={`${
              !hiddenMenu ? "rotate-180" : ""
            } transition-transform duration-300 text-gray-600 dark:text-gray-300 text-xl`}
            icon={faArrowAltCircleRight}
          />
          <div
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 
                          px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                          transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none
                          before:content-[''] before:absolute before:top-1/2 before:-left-1 
                          before:-translate-y-1/2 before:border-4 before:border-transparent 
                          before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
          >
            {hiddenMenu ? t("expandMenu") : t("collapseMenu")}
          </div>
        </div>

        {/* Menú de Navegación Principal */}
        <div className="flex-grow mb-4">
          <ul className="space-y-1">
            {" "}
            <NavItem icon={faHome} text={t("home")} navigateTo="/home" />
            <NavItem
              icon={faUsers}
              text={t("supervisor")}
              navigateTo="/supervisor"
            />
            {roles?.find((role) => role === "Payroll") && (
              <NavItem
                icon={faFileInvoiceDollar}
                text={t("payroll")}
                navigateTo="/payroll"
                hasNotification={hasNewPayrollRequests}
              />
            )}
            {roles?.find((role) => role === "Finance") && (
              <NavItem
                icon={faCoins}
                text={t("finance")}
                navigateTo="/finance"
              />
            )}
          </ul>{" "}
          <div className="mt-auto">
            <ul className="space-y-1">
              {roles?.find((role) => role === "SuperAdmin") && (
                <NavItem
                  icon={faUserGear}
                  text={t("administrator")}
                  navigateTo="/configurationDashboard"
                />
              )}
            </ul>
          </div>
        </div>
      </header>
    </nav>
  );
}

export default NewNav;
