import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MotionGesture from "../Motion/MotionGesture/MotionGesture";

export default function TextButton({
  bgColor = "bg-gray-200",
  hoverBgColor = "bg-blue-100",
  text,
  textColor = "text-black", // El color del texto es negro sólido
  // ¡CAMBIO AQUÍ!: Quitamos el color de hover para el texto. El texto se mantendrá negro.
  hoverTextColor = "",
  textSize = "text-lg",
  type = "button",
  width = "w-fit",
  otherProperties = "",
  onClick = () => {},
  disabled = false,
  icon,
}) {
  return (
    <MotionGesture>
      <button
        className={`
          inline-flex items-center justify-center
          ${otherProperties}
          ${bgColor}
          ${hoverBgColor} 
          ${textSize} 
          ${textColor} 
          ${hoverTextColor} // Esta prop ahora estará vacía, por lo que no aplicará ningún cambio de color.
          ${width}
          py-2 px-4
          rounded-lg
          shadow-md 
       
          backdrop-blur-md
          // Transiciones para todos los cambios (color, fondo, peso de fuente, etc.)
          transition-all duration-200 ease-in-out 
          active:scale-[0.98] active:brightness-90
          // Anillo de foco en negro para consistencia con el texto.
          focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          
          // ¡CAMBIO AQUÍ!: Peso de fuente por defecto normal, y semi-negrita en hover.
          font-normal hover:font-semibold 
        `}
        type={type}
        disabled={disabled}
        autoComplete="off"
        onClick={onClick}
      >
        {text}
        {icon && <FontAwesomeIcon icon={icon} className="ml-2" />}
      </button>
    </MotionGesture>
  );
}
