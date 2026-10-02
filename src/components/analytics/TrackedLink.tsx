"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type Props = {
  href: string;
  event: string;
  props?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
};

export default function TrackedLink({
  href,
  event,
  props,
  className,
  children,
  target,
  rel,
}: Props) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const onClick = () => {
    track(event, props);
  };

  if (isExternal) {
    return (
      <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
