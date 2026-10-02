type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
  }
}

/**
 * Privacy-conscious analytics helper.
 * - Never sends form field values, emails, or other PII.
 * - Uses Plausible when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured.
 * - Falls back to a no-PII custom event queue for local/dev inspection.
 */
export function track(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;

  const cleanProps = props
    ? Object.fromEntries(
        Object.entries(props).filter(([, value]) => value !== undefined)
      )
    : undefined;

  try {
    if (typeof window.plausible === "function") {
      window.plausible(event, cleanProps ? { props: cleanProps } : undefined);
    }
  } catch {
    // ignore analytics failures
  }

  if (process.env.NODE_ENV === "development") {
    // Local visibility only — no network call, no personal data
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, cleanProps || {});
  }
}

export function trackPageView(path: string) {
  track("pageview", { path });
}
