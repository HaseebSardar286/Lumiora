import Image from "next/image";
import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  /** Visual height in pixels */
  height?: number;
  className?: string;
  priority?: boolean;
  /** Use the light mark on dark backgrounds (footer, etc.) */
  variant?: "default" | "onDark";
};

export default function BrandLogo({
  height = 40,
  className = "",
  priority = false,
  variant = "default",
}: BrandLogoProps) {
  // Stacked badge + wordmark lockup (square canvas)
  const aspect = 1;
  const width = Math.round(height * aspect);
  const src = variant === "onDark" ? BRAND.logoOnDarkPath : BRAND.logoPath;

  return (
    <Image
      src={src}
      alt={BRAND.logoAlt}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={`object-contain bg-transparent ${className}`}
      style={{ width: "auto", height, background: "transparent" }}
    />
  );
}
