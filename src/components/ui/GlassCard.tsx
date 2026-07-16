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
        glass-card rounded-2xl ${padding}
        ${hover ? "hover:shadow-2xl cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
