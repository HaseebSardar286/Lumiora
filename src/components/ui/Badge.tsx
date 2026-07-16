import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "indigo" | "purple" | "violet" | "green" | "orange";
  className?: string;
}

const variantStyles = {
  blue: "bg-brand-700 text-brand-700 border-brand-200",
  indigo: "bg-brand-50 text-brand-800 border-brand-200",
  purple: "bg-brand-700 text-brand-700 border-brand-200",
  violet: "bg-brand-700 text-brand-700 border-brand-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  orange: "bg-orange-50 text-orange-700 border-orange-100",
};

export default function Badge({
  children,
  variant = "indigo",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        border ${variantStyles[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
