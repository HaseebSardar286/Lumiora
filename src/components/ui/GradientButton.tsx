"use client";

import React from "react";
import Link from "next/link";

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function GradientButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-brand-700 text-white hover:bg-brand-800 shadow-sm hover:shadow-md",
    secondary:
      "bg-brand-50 text-brand-800 border border-brand-200 hover:bg-brand-100 hover:border-brand-300",
    outline:
      "bg-transparent text-brand-700 border-2 border-brand-400 hover:bg-brand-50 hover:border-brand-600",
  };

  const baseClasses = `
    inline-flex items-center gap-2 font-medium rounded-xl
    transition-colors duration-200
    ${sizeClasses[size]} ${variantClasses[variant]} ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
