// components/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled,
}: {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${disabled ? "bg-gray-400" : "bg-blue-500 over:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"}  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
