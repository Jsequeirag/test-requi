import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import WebsiteConfig from "../../../stores/WebsiteConfig";
import { navRoleConfig } from "../../config/navRoles";
import { translations } from "../../config/translations";
import PendingRequisitionStore from "../../../stores/PendingRequisitionStore";
import {
  RoleKeyMap,
  getRoleNotifications,
  ActiveMenuRoles,
} from "../../contansts/roles";
import { getLocalStorageItem, saveLocalStorage } from "../../utils/localstore";
import { ChevronRight } from "lucide-react";

function Nav() {
  const requisitions = PendingRequisitionStore((s) => s.requisitions);
  const notificationsByRole = getRoleNotifications(requisitions);

  const navigate = useNavigate();
  const themeColors = WebsiteConfig((s) => s.themeColors);
  const setShrinkMenu = WebsiteConfig((s) => s.setShrinkMenu);

  const userInfo =
    JSON.parse(getLocalStorageItem("requitool-employeeInfo")) || {};
  const roles = JSON.parse(getLocalStorageItem("requitool-roles")) || [];

  const [language] = useState(getLocalStorageItem("requi-language") || "es");
  const [theme] = useState(
    themeColors[getLocalStorageItem("requitool-themeColorNumber")] ||
      themeColors[0]
  );
  const [hiddenMenu, setHiddenMenu] = useState(
    getLocalStorageItem("requi-shrinkMenu") === "true"
  );

  const t = (key) => translations[language][key] || key;

  const getInitial = () => {
    const fullName = userInfo.name || "U";
    return fullName.charAt(0).toUpperCase();
  };

  const handleMenuToggle = () => {
    const newValue = !hiddenMenu;
    setHiddenMenu(newValue);
    saveLocalStorage("requi-shrinkMenu", newValue.toString());
    setShrinkMenu(newValue);
  };

  const activeRoleItems = roles
    .map((r) => r.toLowerCase())
    .filter((role) => ActiveMenuRoles.includes(role)) // ← ahora sí filtra roles permitidos
    .map((role) => ({ ...navRoleConfig[role], role }));

  return (
    <nav
      className={`fixed top-0 left-0 h-full ${
        hiddenMenu ? "w-20" : "w-64"
      } bg-white/30 dark:bg-gray-900/35 backdrop-blur-md shadow-lg px-4 py-6 
      transition-all duration-300 z-50 border-r border-gray-200 dark:border-gray-800`}
    >
      <header className="sidebar text-gray-700 h-full flex flex-col">
        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <img
            className="rounded-lg shadow-md bg-gray-100"
            src="/assets/resourcesLogoXs.png"
            width={hiddenMenu ? 50 : 80}
            alt="logo"
          />
          {!hiddenMenu && (
            <h1 className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-300">
              {t("requiflow")}
            </h1>
          )}
        </div>

        {/* USER PROFILE */}
        <div
          className={`relative flex shadow-md group ${
            hiddenMenu && "justify-center"
          } items-center w-full p-2 rounded-lg ${theme?.bgColor}`}
        >
          <div
            className={`inline-flex items-center justify-center rounded-full ${
              theme?.accentColor
            }
            font-bold ${hiddenMenu ? "w-10 h-10" : "w-12 h-12"} shadow-sm`}
          >
            {getInitial()}
          </div>

          {!hiddenMenu && (
            <div className="flex flex-col ml-3">
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {userInfo.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {userInfo.descripPuesto} - {userInfo.descripDepartamento}
              </span>
            </div>
          )}
        </div>

        {/* MENU TOGGLE */}
        <div
          className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 flex items-center justify-center
          bg-white dark:bg-gray-800 rounded-full shadow-md border cursor-pointer"
          onClick={handleMenuToggle}
        >
          <ChevronRight
            className={`${
              !hiddenMenu ? "rotate-180" : ""
            } transition-transform text-gray-600`}
          />
        </div>

        {/* MENU ITEMS */}
        <div className="flex-grow mt-6">
          <ul className="space-y-1">
            {/* HOME */}
            <NavItem
              icon={navRoleConfig.home.icon}
              text={t("home")}
              navigateTo="/home"
              hiddenMenu={hiddenMenu}
              theme={theme}
            />

            {/* ROLES ACTIVOS */}
            {activeRoleItems.map(({ icon, translationKey, path, role }) => {
              console.log("role:", role, "roleId:", RoleKeyMap[role]); // <--- AGREGA ESTO
              const roleId = RoleKeyMap[role];
              const { hasNotification = false, count = 0 } =
                notificationsByRole[roleId] || {};

              return (
                <NavItem
                  key={role}
                  icon={icon}
                  text={t(translationKey)}
                  navigateTo={path}
                  hiddenMenu={hiddenMenu}
                  theme={theme}
                  hasNotification={hasNotification}
                  count={count}
                />
              );
            })}
          </ul>
        </div>
      </header>
    </nav>
  );
}

export default Nav;
