import React, { useState, useEffect } from "react";
// REMOVE FontAwesomeIcon if you're only using Lucid in NavItem
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { formatUserName } from "../../utils/general";
import WebsiteConfig from "../../../stores/WebsiteConfig"; // Corrected path
import {
  getLocalStorageKeyValue,
  saveLocalStorage,
  getLocalStorageItem,
} from "../../utils/localstore";

// === IMPORTAR COMPONENTES LUCID ICONS ===
import {
  Users, // Para Supervisor
  Settings, // Para SuperAdmin
  Wallet, // Para Finance
  FileText, // Para Payroll
  UserCheck, // Para HR
  Home, // Para el ítem "Inicio"
  ChevronRight, // Para Expandir/Contraer menú
  UserPlus,
} from "lucide-react";

import NavItem from "./NavItem"; // Ajusta la ruta según donde lo guardes

// Configuración de idiomas
const translations = {
  es: {
    home: "Inicio", // Cambiado de 'inicio' a 'home' para consistencia con pathSegment
    supervisor: "Supervisor",
    payroll: "Payroll",
    finance: "Finanzas",
    activos: "Activos",
    superAdmin: "Administrador",
    recruitment: "Reclutamiento", // Clave ajustada para coincidir con roleNavConfig
    logout: "Cerrar Sesión",
    asolion: "Asolion",
    darkMode: "Modo Oscuro",
    language: "Idioma",
    expandMenu: "Expandir menú",
    collapseMenu: "Contraer menú",
    userProfile: "Perfil de Usuario",
    dataAnalyst: "Analista de Datos",
    requitools: "Requitools",
    hr: "HR", // Añadido
    md: "MD", // Añadido
    it: "IT", // Añadido
  },
  en: {
    home: "Home",
    supervisor: "Supervisor",
    recluitment: "Recruitment",
    activo: "Actives",
    payroll: "Payroll",
    finance: "Finance",
    superAdmin: "Administrator", // Clave ajustada
    logout: "Logout",
    darkMode: "Dark Mode",
    language: "Language",
    expandMenu: "Expand menu",
    collapseMenu: "Collapse menu",
    userProfile: "User Profile",
    dataAnalyst: "Data Analyst",
    requitools: "Requitools",
    hr: "HR", // Added
    md: "MD", // Added
    it: "IT", // Added
  },
};

function NewNav() {
  // === roleNavConfig con claves en minúsculas y componentes Lucid ===
  const roleNavConfig = {
    home: { icon: Home, translationKey: "home", pathSegment: "home" }, // Añadido para el inicio
    reclutamiento: {
      icon: UserPlus,
      translationKey: "Recruitment",
      pathSegment: "recruitment",
    },

    supervisor: {
      icon: Users,
      translationKey: "Supervisor",
      pathSegment: "supervisor",
    },
    finanzas: {
      icon: Wallet,
      translationKey: "Finanzas",
      pathSegment: "finance",
    },
    payroll: {
      icon: FileText,
      translationKey: "Payroll",
      pathSegment: "payroll",
    },
    hr: { icon: UserCheck, translationKey: "hr", pathSegment: "hr" }, // Clave 'hr'
    superadmin: {
      icon: Settings,
      translationKey: "SuperAdmin",
      pathSegment: "configurationDashboard",
    },
    activos: {
      icon: Home,
      translationKey: "Activos",
      pathSegment: "assetsDashboard",
    },
    humancapital: {
      icon: UserCheck,
      translationKey: "Human Capital",
      pathSegment: "humanCapitalDashboard",
    },
    mdm: {
      icon: Settings,
      translationKey: "MD",
      pathSegment: "masterData",
    },
    it: {
      icon: Settings,
      translationKey: "IT",
      pathSegment: "itDashboard",
    },
    asolion: {
      icon: Settings,
      translationKey: "Asolion",
      pathSegment: "asolionDashboard",
    },
  };

  const themeColors = WebsiteConfig((state) => state.themeColors);

  const [language, setLanguage] = useState(() => {
    const storedLang = getLocalStorageItem("requi-language");
    if (storedLang) return storedLang;
    const browserLang = navigator.language.split("-")[0];
    return browserLang === "es" ? "es" : "en";
  });
  const [theme, setTheme] = useState(() => {
    const storedTheme = getLocalStorageItem("requitool-themeColorNumber");
    if (storedTheme) return themeColors[storedTheme];
    return themeColors[0]; // Fallback si no hay tema guardado
  });

  const [hiddenMenu, setHiddenMenu] = useState(() => {
    const storedShrink = getLocalStorageItem("requi-shrinkMenu");
    return storedShrink === "true";
  });
  const [roles, setRoles] = useState([]);
  const [hasNewPayrollRequests, setHasNewPayrollRequests] = useState(true); // Mantener para el ejemplo

  const setShrinkMenu = WebsiteConfig((state) => state.setShrinkMenu);

  // Función para obtener traducciones (si no usas i18next directamente)
  const t = (key) => translations[language][key] || key;

  useEffect(() => {
    setRoles(JSON.parse(getLocalStorageItem("requitool-roles")) || []);

    const storedShrink = getLocalStorageItem("requi-shrinkMenu");
    const isMenuHiddenFromStorage = storedShrink
      ? storedShrink.trim().toLowerCase() === "true"
      : false;

    setHiddenMenu(isMenuHiddenFromStorage);
    setShrinkMenu(isMenuHiddenFromStorage);

    const storedLang = getLocalStorageItem("requi-language");
    if (storedLang) {
      setLanguage(storedLang);
    }

    const storedTheme = getLocalStorageItem("requitool-themeColorNumber");
    if (storedTheme) setTheme(themeColors[storedTheme]);
    else setTheme(themeColors[0]); // Asegurar que el tema siempre se inicialice
  }, []);

  // Función para obtener inicial del usuario (si es necesario)
  const getUserInitial = () => {
    const userName = getLocalStorageKeyValue("requitool-employeeInfo", "name");
    return userName ? formatUserName(userName).charAt(0).toUpperCase() : "U";
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
        bg-white/30 dark:bg-gray-900/35
        backdrop-blur-md shadow-lg
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
            className={`relative flex shadow-md  group ${
              hiddenMenu && "justify-center"
            } items-center w-full p-2 rounded-lg  transition-all duration-300 ${
              theme?.bgColor
            }`}
          >
            <span className="flex-shrink-0">
              <div
                className={`inline-flex items-center justify-center rounded-full dark:text-white ${
                  theme?.accentColor
                } font-bold
                ${hiddenMenu ? "w-10 h-10 text-xl" : "w-12 h-12 text-2xl"}
                shadow-sm transition-all duration-300`}
                style={{
                  transition:
                    "width 0.3s ease-in-out, height 0.3s ease-in-out ",
                }}
              >
                {formatUserName(getUserInitial())}
              </div>
            </span>
            {!hiddenMenu && (
              <div className="flex flex-col ml-3 overflow-hidden whitespace-nowrap">
                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {formatUserName(
                    getLocalStorageKeyValue("requitool-employeeInfo", "name")
                  ) || "User Name"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  <>
                    {" "}
                    {`${getLocalStorageKeyValue(
                      "requitool-employeeInfo",
                      "descripPuesto"
                    )} -
                      ${getLocalStorageKeyValue(
                        "requitool-employeeInfo",
                        "descripDepartamento"
                      )}`}
                  </>
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
          <ChevronRight // Usando Lucid icon para el toggle
            className={`${
              !hiddenMenu ? "rotate-180" : ""
            } transition-transform duration-300 text-gray-600 dark:text-gray-300 text-xl`}
            // icon={faArrowAltCircleRight} // REMOVED FontAwesome
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
            {/* === INICIO: Renderizado dinámico de TODOS los NavItems === */}
            {roles &&
              roles.map((roleNameFromRolesArray) => {
                const lowercaseRoleName = roleNameFromRolesArray.toLowerCase();
                const config = roleNavConfig[lowercaseRoleName];
                if (config) {
                  const navigateToPath = `/${config.pathSegment}`;
                  let notificationProps = {};
                  // Lógica específica para notificaciones (ej. para el rol 'Payroll')
                  if (
                    lowercaseRoleName === "payroll" &&
                    hasNewPayrollRequests
                  ) {
                    notificationProps.hasNotification = hasNewPayrollRequests;
                  }
                  return (
                    <NavItem
                      key={roleNameFromRolesArray} // La clave debe ser única
                      icon={config.icon} // Pasa el componente Lucid icon
                      text={t(config.translationKey)}
                      navigateTo={navigateToPath}
                      hiddenMenu={hiddenMenu} // Pasa hiddenMenu a NavItem
                      theme={theme} // Pasa theme a NavItem
                      {...notificationProps}
                    />
                  );
                }
                // console.warn(`No se encontró configuración para el rol: ${roleNameFromRolesArray}. No se renderizará NavItem.`);
                return null;
              })}
          </ul>
          <div className="mt-auto">
            <ul className="space-y-1"></ul>
          </div>
        </div>
      </header>
    </nav>
  );
}

export default NewNav;
