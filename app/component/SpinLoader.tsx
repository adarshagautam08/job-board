"use client";

import React from "react";

interface SpinLoaderProps {
  size?: "w-16 h-16" | "w-12 h-12" | "w-20 h-20"; // predefined sizes
  color?: string; // Tailwind border-t color class like "border-yellow-500"
  title?: string;
  subtitle?: string;
}

const SpinLoader: React.FC<SpinLoaderProps> = ({
  size = "w-16 h-16",
  color = "border-yellow-500",
  title = "Loading...",
  subtitle = "",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div
        className={`${size} border-4 border-t-[${color}] border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin`}
      ></div>
      <h2 className="text-white mt-4 font-semibold">{title}</h2>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
};

export default SpinLoader;