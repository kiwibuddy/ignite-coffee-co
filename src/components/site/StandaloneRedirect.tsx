"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** When launched as an installed PWA, send `/` into the ordering app. */
export function StandaloneRedirect() {
  const router = useRouter();
  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone === true);
    if (standalone) {
      router.replace("/app?source=pwa");
    }
  }, [router]);
  return null;
}
