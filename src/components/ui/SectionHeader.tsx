import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-brand-50 text-brand-700 border border-brand-200">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
        {highlight ? (
          <>
            {title}{" "}
            <span className="gradient-text">{highlight}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="text-[#475569] text-lg max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
