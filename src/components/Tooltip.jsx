import React from "react";
import { Info } from "lucide-react";

export default function Tooltip({ text }) {
  return (
    <div className="relative inline-block">
      {/* Ícono circular con peer */}
      <div className="peer w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer">
        <Info className="w-3 h-3" />
      </div>

      {/* Tooltip visible solo si el cursor está directamente sobre el ícono */}
      <div
        className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 
                   px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                   opacity-0 invisible peer-hover:opacity-100 peer-hover:visible
                   transition-opacity duration-200 whitespace-nowrap pointer-events-none
                   before:content-[''] before:absolute before:top-1/2 before:-left-1 
                   before:-translate-y-1/2 before:border-4 before:border-transparent 
                   before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
      >
        {text}
      </div>
    </div>
  );
}
