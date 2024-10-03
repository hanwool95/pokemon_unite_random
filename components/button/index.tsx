// components/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
