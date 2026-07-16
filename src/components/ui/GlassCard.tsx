"use client";

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: string;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  padding = "p-6",
}: GlassCardProps) {
  return (
    <div
      className={`
        bg-white border border-gray-200 shadow-sm rounded-2xl ${padding}
        ${hover ? "hover:shadow-md" : ""}
        transition-shadow duration-200
        ${className}
      `}
    >
      {children}
    </div>
  );
}
