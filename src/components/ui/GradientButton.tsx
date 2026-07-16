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
      "bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white hover:from-brand-700 hover:via-brand-700 hover:to-brand-600 shadow-lg hover:shadow-brand-200 hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-brand-50 to-brand-100 text-brand-800 border border-brand-300 hover:border-brand-500 hover:bg-brand-100",
    outline:
      "bg-transparent text-brand-700 border-2 border-brand-500 hover:bg-brand-50 hover:border-brand-700",
  };

  const baseClasses = `
    inline-flex items-center gap-2 font-medium rounded-xl
    transition-all duration-300 transform hover:-translate-y-0.5
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
