import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  saveLocalStorage,
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../utils/localstore";
import websiteConfigStore from "../../../stores/WebsiteConfig";

const SunIcon = ({ className }) => (
  <motion.svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="#F59E0B"
    animate={{
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      rotate: {
        type: "tween",
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
      scale: {
        type: "tween",
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <g stroke="#FCD34D" strokeWidth={2}>
      <path
        strokeLinecap="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
      />
    </g>
    <circle
      cx="12"
      cy="12"
      r="4"
      strokeWidth={2}
      stroke="#F59E0B"
      fill="#FCD34D"
    />
    <circle
      cx="12"
      cy="12"
      r="2.5"
      strokeWidth={1.5}
      stroke="#F59E0B"
      fill="#FEF3C7"
    />
  </motion.svg>
);

const CloudSunIcon = ({ className }) => (
  <motion.svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    animate={{
      y: [0, -4, 0],
      rotate: [0, 2, -2, 0],
    }}
    transition={{
      type: "tween",
      y: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <motion.g
      className="opacity-85"
      stroke="#FCD34D"
      animate={{ rotate: [0, 360] }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <path strokeLinecap="round" strokeWidth={2} d="M12 1v3" />
      <path strokeLinecap="round" strokeWidth={1.5} d="M21 9h-2.5" />
      <path strokeLinecap="round" strokeWidth={1.5} d="M5.5 9H3" />
      <path
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M18.36 3.64l-1.41 1.41"
      />
      <path strokeLinecap="round" strokeWidth={1.5} d="M5.64 3.64l1.41 1.41" />
      <path
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M18.36 14.36l-1.41-1.41"
      />
      <path strokeLinecap="round" strokeWidth={1.5} d="M5.64 14.36l1.41-1.41" />
      <path strokeLinecap="round" strokeWidth={1} d="M12 15v2" />
    </motion.g>

    <motion.g
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <circle
        cx="12"
        cy="9"
        r="4.5"
        strokeWidth={0.5}
        stroke="#FEF3C7"
        fill="none"
        className="opacity-30"
      />
      <circle
        cx="12"
        cy="9"
        r="3.5"
        strokeWidth={2}
        stroke="#F59E0B"
        fill="#FEF3C7"
      />
      <circle
        cx="12"
        cy="9"
        r="2.2"
        strokeWidth={1.5}
        stroke="#F59E0B"
        fill="#FCD34D"
      />
      <circle
        cx="11.5"
        cy="8.5"
        r="0.8"
        fill="#FEF3C7"
        stroke="none"
        className="opacity-70"
      />
    </motion.g>

    <motion.g
      animate={{
        x: [0, 3, 0],
        scale: [1, 1.03, 1],
        y: [0, -1, 0],
      }}
      transition={{
        x: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="#D1D5DB"
        fill="#F9FAFB"
        d="M3.2 17.2a3 3 0 013-3h1a5 5 0 019.5-1.5A4 4 0 0119.2 20.2H6.2a3 3 0 01-3-3z"
        className="opacity-40"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="#9CA3AF"
        fill="white"
        d="M3 17a3 3 0 013-3h1a5 5 0 019.5-1.5A4 4 0 0119 20H6a3 3 0 01-3-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        stroke="#E5E7EB"
        fill="none"
        d="M8 18c2-0.3 4-0.3 6 0M6.5 16.8c1.5-0.2 3-0.2 4.5 0M13.5 16.8c1.5-0.2 3-0.2 4.5 0"
        className="opacity-50"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.8}
        stroke="#F3F4F6"
        fill="none"
        d="M7 15.5c1-0.3 2-0.3 3 0M14 15.5c1-0.3 2-0.3 3 0"
        className="opacity-60"
      />
    </motion.g>
  </motion.svg>
);

const MoonIcon = ({ className }) => (
  <motion.svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="#6B7280"
    animate={{
      rotate: [0, 10, -10, 0],
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{
      type: "tween",
      rotate: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
      scale: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
      opacity: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      stroke="#6B7280"
      fill="#E5E7EB"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </motion.svg>
);
// --- Fin Iconos SVG ---

export default function Topnav() {
  const navigate = useNavigate();
  const storeLanguage = websiteConfigStore((s) => s.language);
  const toggleLanguage = websiteConfigStore((s) => s.toggleLanguage);
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
    const storedLang = getLocalStorageItem("requi-language");
    if (storedLang) return storedLang;
    const browserLang = navigator.language.split("-")[0];
    return browserLang === "es" ? "es" : "en";
  });

  // Saludo dinámico
  const [greeting, setGreeting] = useState({ message: "", icon: SunIcon });

  const getGreeting = () => {
    // Current time in La Fortuna, Alajuela Province, Costa Rica (CST is UTC-6)
    // Using `toLocaleString` for precise time zone handling.
    const nowInCostaRica = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Costa_Rica" })
    );
    const currentHourCR = nowInCostaRica.getHours();

    if (currentHourCR >= 5 && currentHourCR < 12) {
      return { message: "¡Hola, Buenos días!", icon: SunIcon };
    } else if (currentHourCR >= 12 && currentHourCR < 18) {
      return { message: "¡Hola, Buenas tardes!", icon: CloudSunIcon };
    } else {
      return { message: "¡Hola, Buenas noches!", icon: MoonIcon };
    }
  };

  // Translation function
  const t = (key) => translations[language][key] || key;

  // Function to toggle language
  <button
    onClick={toggleLanguage}
    className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    {storeLanguage === "es" ? "Cambiar a Inglés" : "Switch to Spanish"}
  </button>;
  // Function to apply/remove dark mode class on HTML element
  const toggleDarkModeClass = (isDarkModeActive) => {
    const html = document.documentElement;
    if (isDarkModeActive) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      toggleDarkModeClass(newMode);
      saveLocalStorage("requi-darkMode", newMode.toString());
      return newMode;
    });
  };

  // Handle logout
  const handleLogout = () => {
    removeLocalStorageItem("requitool-employeeInfo");
    removeLocalStorageItem("requitool-roles");
    navigate("/login");
  };

  // Effect to load initial configurations (dark mode and language)
  useEffect(() => {
    const storedDarkMode = getLocalStorageItem("requi-darkMode");
    if (storedDarkMode !== null) {
      const isDarkModeActive = storedDarkMode === "true";
      setDarkMode(isDarkModeActive);
      toggleDarkModeClass(isDarkModeActive);
    }

    const storedLang = getLocalStorageItem("requi-language");
    if (storedLang) {
      setLanguage(storedLang);
    }

    // Set initial greeting and update every minute
    setGreeting(getGreeting());
    const greetingInterval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60 * 1000); // Update every minute

    return () => clearInterval(greetingInterval); // Cleanup on unmount
  }, []);

  // Tooltip common styles
  const tooltipClasses = `
    absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50
    px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
    opacity-0 invisible group-hover:opacity-100 group-hover:visible
    transition-all duration-300 delay-300 whitespace-nowrap pointer-events-none
    before:content-[''] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2
    before:border-8 before:border-transparent before:border-b-gray-900
    dark:bg-gray-700 dark:before:border-b-gray-700
  `;

  // Animation variants for the greeting section
  const greetingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <nav
      className={`z-20 fixed left-0 w-full h-16
        bg-white/30 dark:bg-gray-900/35
        backdrop-blur-md shadow-sm
        px-4 transition-all duration-300 
        border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="flex items-center justify-end h-full">
        {/* Left section: Logo and Greeting */}
        <div className="flex items-center space-x-4">
          {/* Greeting Section */}
          <motion.div
            className="flex items-center  space-x-2 p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm"
            animate="visible"
            variants={greetingVariants}
          >
            <motion.div
              className="p-1 rounded-full bg-white/30 dark:bg-gray-700/50 shadow-md"
              whileHover={{
                scale: 1.15,
                rotate: 15,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Renderiza el ícono del saludo dinámicamente */}
              {greeting.icon &&
                React.createElement(greeting.icon, {
                  className:
                    "w-7 h-7 text-gray-800 dark:text-[#bdab78] drop-shadow-sm stroke-2",
                })}
            </motion.div>
            <span className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
              {greeting.message}
            </span>
          </motion.div>
        </div>

        {/* Right section: Navigation links, user icon, etc. */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="relative flex items-center justify-center p-2 rounded-lg
                 text-gray-700 dark:text-gray-300
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 focus:outline-none focus:ring-2 focus:ring-[#bdab78]
                 transition-colors duration-200 group h-10 w-16"
            aria-label={t("language")}
          >
            <ReactCountryFlag
              countryCode={storeLanguage === "es" ? "CR" : "US"}
              svg
              style={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: "2px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
              title={storeLanguage === "es" ? "Costa Rica" : "United States"}
            />

            <span className="ml-2 font-semibold text-sm">
              {storeLanguage.toUpperCase()}
            </span>

            <div className={tooltipClasses}>{t("language")}</div>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkModeToggle}
            className={`relative flex items-center h-8 w-14 rounded-full cursor-pointer
                       ${
                         darkMode
                           ? "bg-blue-600" // Fondo cuando está en modo oscuro (activo)
                           : "bg-gray-300 dark:bg-gray-700" // Fondo cuando está en modo claro (inactivo)
                       }
                       transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#bdab78]`}
            aria-label={t("darkMode")}
          >
            <motion.div
              className={`absolute top-[50%] -translate-y-1/2 w-7 h-7 rounded-full shadow-md flex items-center justify-center
                         ${darkMode ? "bg-white" : "bg-white"} `}
              // Usamos 'left' en lugar de 'x' para un posicionamiento más predecible
              // Calculamos para 2px de padding a cada lado:
              // Ancho del riel (w-14) = 56px
              // Ancho del arrastrador (w-6) = 24px
              // Posición izquierda = 2px
              // Posición derecha = 56px (ancho riel) - 24px (ancho arrastrador) - 2px (padding) = 30px
              initial={{ left: "2px" }} // Posición inicial para el modo claro
              animate={{ left: darkMode ? "27px" : "2px" }} // Posición final para el modo oscuro
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              {darkMode ? (
                <Moon size={16} className="text-gray-800" /> // Color del icono en modo oscuro
              ) : (
                <Sun size={16} className="text-[#bdab78]" /> // Color del icono en modo claro
              )}
            </motion.div>
            <div className={tooltipClasses}>{t("darkMode")}</div>
          </button>

          {/* User Profile */}
          {/*
          <button
            onClick={() => navigate("/profile")}
            className="relative flex items-center justify-center p-2 rounded-lg
                       text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700
                       focus:outline-none focus:ring-2 focus:ring-[#bdab78]
                       transition-colors duration-200 group h-10 w-10"
            aria-label={t("userProfile")}
          >
            <User size={20} />
            <div className={tooltipClasses}>{t("userProfile")}</div>
          </button>
* }
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="relative flex items-center justify-center p-2 rounded-lg
                       bg-red-100 text-red-600
                       hover:bg-red-200 dark:bg-red-700 dark:text-white dark:hover:bg-red-600
                       focus:outline-none focus:ring-2 focus:ring-red-500
                       transition-colors duration-200 group h-10 w-10"
            aria-label={t("logout")}
          >
            <LogOut size={20} />
            <div className={tooltipClasses}>{t("logout")}</div>
          </button>
        </div>
      </div>
    </nav>
  );
}
