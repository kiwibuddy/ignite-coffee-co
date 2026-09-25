"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/** True once the component has mounted in the browser. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

/** True when the viewport is narrower than the md breakpoint. */
export function useIsMobile(breakpoint = 768): boolean {
  const query = `(max-width: ${breakpoint - 1}px)`;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Greeting that follows the clock on the device. */
export function useGreeting(): string {
  const subscribe = useCallback((onChange: () => void) => {
    const id = window.setInterval(onChange, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const hour = useSyncExternalStore(
    subscribe,
    () => new Date().getHours(),
    () => 8,
  );

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
