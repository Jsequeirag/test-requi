import React, { useState, useEffect } from "react";
import { IconButton } from "../../components/Button/Button"; // Assuming Button.jsx exports IconButton
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { getLocalStorageItem } from "../../utils/localstore"; // For dark mode

export default function ModalRequisitionDetails({
  openModal = false,
  setOpenModal,
  childrenComponent,
  // Removed pcWidth/movilWidth. We'll use a single maxWidth prop like in GeneralModal.
  // This ensures consistency and proper Tailwind JIT compilation.
  maxWidth = "max-w-2xl", // Default max-width (e.g., 48rem or 768px). Adjust as needed.
}) {
  // Local state for dark mode. Make sure `getLocalStorageItem` returns "true" or "false" string.
  // This useEffect looks correct for initial dark mode setting.
  const [darkMode, setDarkMode] = useState(false); // Default to false, then check local storage

  useEffect(() => {
    const storedDarkMode = getLocalStorageItem("requi-darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // If the modal is not open, return null to prevent rendering
  if (!openModal) {
    return null;
  }

  // Handle closing the modal when clicking outside of it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenModal(false);
    }
  };

  return (
    // Backdrop / Overlay
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center 
        bg-gray-950/50 backdrop-blur-sm  
        transition-opacity duration-300  
        ${
          openModal ? "opacity-100 visible" : "opacity-0 invisible"
        } // Control visibility
      `}
      onClick={handleBackdropClick} // Click outside to close
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title" // Points to the main title within childrenComponent
    >
      {/* Modal Content */}
      <div
        className={`
          relative bg-white dark:bg-gray-800 rounded-lg shadow-xl // Main modal box styling
          p-6 // Increased padding for better internal spacing
          transform transition-all // For potential entry/exit animations
          sm:w-full ${maxWidth} mx-auto my-8 // Responsive width, max-width, horizontal auto-margin, vertical margin
        `}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <IconButton
            bgColor={`bg-red-500`}
            hoverBgColor={`hover:bg-red-600`} // Slightly darker red on hover
            hoverTextColor={`hover:text-white`} // Ensure text stays white for contrast
            otherProperties="rounded-full w-8 h-8 flex items-center justify-center p-0" // Small, round button
            icon={faCircleXmark}
            onClick={() => setOpenModal(false)}
            aria-label="Cerrar modal" // Accessibility
          />
        </div>

        {/* Children Component (Modal Body) */}
        {/* The key={openModal ? Date.now() : "closed"} is a good pattern if you need to force re-render
            childrenComponent every time the modal opens, useful if childrenComponent has internal state
            that needs to be reset on modal open. Otherwise, it can be removed. */}
        <div className="pt-4 pb-2 px-2">
          {" "}
          {/* Added internal padding for content */}
          {childrenComponent}
        </div>
      </div>
    </div>
  );
}
