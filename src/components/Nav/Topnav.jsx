import { React, useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
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
  faLanguage, // Language toggle
} from "@fortawesome/free-solid-svg-icons";
import {
  saveLocalStorage,
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../utils/localstore";
// You'll likely need a state variable for responsiveness or other dynamic behavior
// For a simple topnav, you might not even need state directly in this component
// unless it controls something like a mobile menu toggle.
// For demonstration, let's assume `isHidden` is passed as a prop if you want to
// control its visibility from a parent.

export default function Topnav() {
  const navigate = useNavigate();
  const translations = {
    es: {
      dashboard: "Dashboard",
      payroll: "Nómina",
      finance: "Finanzas",
      configurations: "Configuraciones",
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
      dashboard: "Dashboard",
      payroll: "Payroll",
      finance: "Finance",
      configurations: "Settings",
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
  // Estados locales
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(() => {
    // Inicializar idioma desde localStorage o detectar navegador
    const storedLang = getLocalStorageItem("requi-language");
    if (storedLang) return storedLang;
    const browserLang = navigator.language.split("-")[0];
    return browserLang === "es" ? "es" : "en";
  });

  const t = (key) => translations[language][key] || key; // Efecto para guardar preferencia de modo oscuro

  // Función para cambiar idioma
  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es";
    setLanguage(newLang);
    saveLocalStorage("requi-language", newLang);
  };
  const DarkModeSeleted = () => {
    const html = document.documentElement;
    if (!darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  };
  const handleLogout = () => {
    removeLocalStorageItem("requitool-employeeInfo");
    removeLocalStorageItem("requitool-roles");

    navigate("/login");
  };
  // Efecto para cargar configuraciones iniciales
  useEffect(() => {
    // Cargar modo oscuro
    const storedDarkMode = getLocalStorageItem("requi-darkMode");
    if (storedDarkMode) {
      const isDarkModeActive = storedDarkMode === "true";
      setDarkMode(isDarkModeActive);
      const html = document.documentElement;
      if (isDarkModeActive) html.classList.add("dark");
      else html.classList.remove("dark");
    }

    // Cargar idioma
    const storedLang = getLocalStorageItem("requi-language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);
  useEffect(() => {
    saveLocalStorage("requi-darkMode", darkMode.toString());
  }, [darkMode]);
  // Función DarkModeSelected
  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16  // Key changes here: w-full, h-16 (example height)
        bg-gray-50 dark:bg-gray-900/90
        backdrop-blur-xl 
        px-4 py-4  // Adjusted padding for a horizontal bar
        transition-all duration-300 z-10
        border-b border-gray-200 dark:border-gray-800 // Border on bottom
     
      `}
    >
      {/* Content of your top navigation bar goes here */}
      <div className="flex items-center justify-between h-full">
        {/* Left section: Logo or App Name */}
        <div className="text-lg font-bold text-gray-800 dark:text-gray-100"></div>

        {/* Right section: Navigation links, user icon, etc. */}
        <div className="flex items-center space-x-4">
          <li
            className={`nav-link relative h-12  flex items-cente  rounded-md group
                                    bg-gray-100 dark:bg-gray-700
                                    text-gray-700 dark:text-gray-300
                                    hover:bg-blue-100 dark:hover:bg-gray-600
                                    transition-colors duration-200 cursor-pointer`}
            onClick={toggleLanguage}
          >
            <div
              className={`min-w-[60px] h-[50px] flex items-center justify-center  
               `}
            >
              <ReactCountryFlag
                countryCode={language === "es" ? "CR" : "US"}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",

                  borderRadius: "2px",
                }}
                title={language === "es" ? "Costa Rica" : "United States"}
              />
            </div>
            <span
              className={`text nav-text font-semibold dark:text-gray-200 transition-all delay-100 whitespace-nowrap   w-auto opacity-100 
                overflow-hidden`}
            >
              {language.toUpperCase()}
            </span>
            {/* Tooltip para idioma */}
            {
              <div
                className="absolute right-full ml-2 top-1/2 -translate-y-1/2 z-50 
                                          px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                          transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none
                                          before:content-[''] before:absolute before:top-1/2 before:-left-1 
                                          before:-translate-y-1/2 before:border-4 before:border-transparent 
                                          before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
              >
                {t("language")} ({language.toUpperCase()})
              </div>
            }
          </li>
          {/* Toggle de Modo Oscuro */}
          <li
            className={`nav-link  relative h-12  flex items-center rounded-md group p-1
                          ${darkMode ? "bg-gray-700" : "bg-gray-100"}
                          text-gray-700 dark:text-gray-300
                          transition-colors duration-200`}
          >
            <div className={`h-[50px] flex items-center justify-center px-1`}>
              <FontAwesomeIcon
                className={`${!darkMode && "hidden"} text-2xl`}
                icon={faMoon}
                color="#bdab78"
              />
              <FontAwesomeIcon
                className={`${darkMode && "hidden"} text-2xl`}
                icon={faSun}
                color="black"
              />
            </div>

            <div className={`ml-2 flex items-center`}>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  checked={darkMode}
                  className="sr-only peer"
                  onClick={() => {
                    setDarkMode(!darkMode);
                    DarkModeSeleted();
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </li>
          {/*Logout*/}
          <li
            className={`nav-link relative h-12  flex items-cente  rounded-md group
                                    bg-gray-100 dark:bg-gray-700
                                    text-gray-700 dark:text-gray-300
                                    hover:bg-blue-100 dark:hover:bg-gray-600
                                    transition-colors duration-200 cursor-pointer`}
            onClick={handleLogout}
          >
            <div
              className={`min-w-[60px] h-[50px] flex items-center justify-center  
               `}
            >
              <FontAwesomeIcon
                className={`${darkMode && "hidden"} text-2xl`}
                icon={faRightFromBracket}
                color="black"
              />
              <FontAwesomeIcon
                className={`${!darkMode && "hidden"} text-2xl`}
                icon={faRightFromBracket}
                color={"#bdab78"}
              />
            </div>

            {
              <div
                className="absolute right-full ml-2 top-1/2 -translate-y-1/2 z-50 
                                          px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                          transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none
                                          before:content-[''] before:absolute before:top-1/2 before:-left-1 
                                          before:-translate-y-1/2 before:border-4 before:border-transparent 
                                          before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
              >
                {t("logout")}
              </div>
            }
          </li>
        </div>
      </div>
    </nav>
  );
}
