type UmamiEvent = "story-expanded" | "brief-copied" | "theme-toggled";

export function trackEvent(event: UmamiEvent, data?: Record<string, string>) {
  if (typeof window !== "undefined" && "umami" in window) {
    (window as unknown as { umami: { track: (event: string, data?: Record<string, string>) => void } }).umami.track(event, data);
  }
}
