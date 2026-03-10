// src/components/ui/Card.tsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
  padding?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  shadow = true,
  padding = "p-4",
  children,
  className,
  ...rest
}) => {
  const { theme } = useTheme();

  const bgColor =
    theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const shadowClass = shadow ? "shadow-lg" : "shadow-none";

  return (
    <div
      className={`${bgColor} ${shadowClass} rounded-xl ${padding} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;