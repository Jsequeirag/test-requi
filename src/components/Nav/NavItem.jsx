import React from "react";
import { useNavigate } from "react-router-dom";

const NavItem = ({
  icon: IconComponent,
  text,
  navigateTo,
  hasNotification = false,
  count = 0,
  hiddenMenu,
  theme,
}) => {
  const navigate = useNavigate();

  const showDot = hasNotification && count === 1;
  const showBadge = hasNotification && count > 1;

  return (
    <li
      className={`nav-link relative h-12 flex items-center ${theme?.hoverColor}
      rounded-lg transition-all duration-200 cursor-pointer group`}
    >
      <button
        type="button"
        className={`no-underline h-full w-full flex items-center
          text-gray-700 dark:text-gray-300
          hover:text-black dark:hover:text-white
          focus:outline-none focus:ring-2 focus:ring-blue-300/50
          active:scale-[0.98]
          ${hiddenMenu ? "justify-center" : "justify-start"}`}
        onClick={() => navigate(navigateTo)}
      >
        {/* ICON */}
        {IconComponent && (
          <IconComponent
            size={24}
            className="min-w-[60px] text-2xl group-hover:text-black dark:group-hover:text-white"
          />
        )}

        {/* TEXT */}
        <span
          className={`text nav-text font-semibold whitespace-nowrap overflow-hidden
            ${hiddenMenu ? "w-0 opacity-0" : "w-auto opacity-100"}
            transition-all duration-200 delay-100`}
        >
          {text}
        </span>

        {/* --- 🔴 SINGLE-DOT NOTIFICATION --- */}
        {showDot && (
          <div
            className={`absolute top-2 right-2.5
              w-2.5 h-2.5 bg-red-500 rounded-full 
              ${hiddenMenu ? "left-[calc(50%+12px)] right-auto" : ""}
              `}
          ></div>
        )}

        {/* --- 🔴 BADGE WITH ANIMATION (MenuCard STYLE) --- */}
        {showBadge && (
          <div
            className={`absolute top-1.5 right-2 z-20
            ${hiddenMenu ? "left-[calc(50%+8px)] right-auto" : ""}`}
          >
            {/* Badge principal */}
            <div className="relative">
              <div
                className="bg-red-500 text-white rounded-full
                min-w-[20px] h-[20px] px-1.5 flex items-center justify-center
                text-xs font-bold shadow-md animate-pulse"
              >
                {count > 99 ? "99+" : count}
              </div>

              {/* Anillo expansivo (igual a MenuCard) */}
              <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        )}
      </button>

      {/* TOOLTIP (solo si está colapsado) */}
      {hiddenMenu && (
        <div
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-[100]
        px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none"
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default NavItem;
