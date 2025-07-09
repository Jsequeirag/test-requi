import React from "react";

export default function Tooltip({ children, text, show }) {
  if (!show || !text) return children;
  return (
    <div className="relative group">
      {children}
      <div
        className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 
                      px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none
                      before:content-[''] before:absolute before:top-1/2 before:-left-1 
                      before:-translate-y-1/2 before:border-4 before:border-transparent 
                      before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
      >
        {text}
      </div>
    </div>
  );
}
