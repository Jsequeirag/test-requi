import React from "react";

export default function topnav() {
  return (
    <nav
      className={`fixed top-0 left-0 h-full
    ${hiddenMenu ? "w-20" : "w-64"}
    bg-gray-50 dark:bg-gray-900/90
    backdrop-blur-xl shadow-lg
    px-4 py-6 transition-all duration-300 z-50
    border-r border-gray-200 dark:border-gray-800`}
    ></nav>
  );
}
