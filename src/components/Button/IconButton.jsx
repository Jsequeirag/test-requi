import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MotionGesture from "../Motion/MotionGesture/MotionGesture";

export default function IconButton({
  bgColor = "bg-black",
  hoverBgColor = "hover:bg-gray-900",
  text,
  textColor = "text-white",
  hoverTextColor = "hover:text-[#C2AE4A]",
  textSize = "text-lg",
  type = "button",
  width = "w-[300px]",
  otherProperties = "",
  onClick = () => alert("onClick"),
  onChange = () => alert("No onChange"),
  disabled = false,
  icon,
}) {
  return (
    <MotionGesture>
      <button
        className={`${otherProperties} ${bgColor} ${hoverBgColor}  ${textSize}  ${textColor} ${hoverTextColor} ${width} shadow-md  rounded-sm w-full py-2 px-3  `}
        type={type}
        disabled={disabled}
        autoComplete="off"
        onChange={onChange}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} size="lg" />
      </button>
    </MotionGesture>
  );
}
