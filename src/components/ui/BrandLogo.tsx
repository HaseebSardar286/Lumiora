import Image from "next/image";
import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  /** Visual height in pixels */
  height?: number;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  height = 40,
  className = "",
  priority = false,
}: BrandLogoProps) {
  // Full stacked logo (rocket above wordmark), roughly square
  const aspect = 1000 / 951;
  const width = Math.round(height * aspect);

  return (
    <Image
      src={BRAND.logoPath}
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
