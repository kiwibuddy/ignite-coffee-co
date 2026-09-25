"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { useMounted } from "@/components/app/hooks";
import { Flame } from "@/components/brand/Flame";
import { cn } from "@/lib/utils";

export default function AppPage() {
  return (
    <Suspense fallback={<BootFrame />}>
      <OrderingApp />
    </Suspense>
  );
}

function OrderingApp() {
  const params = useSearchParams();
  const embed = params.get("embed") === "1";
  const initialItemId = params.get("item") ?? undefined;
  const source = params.get("source") ?? undefined;
  const mounted = useMounted();

  const screen = (
    <div
      className={cn(
        "h-[100dvh] w-full overflow-hidden bg-crema",
        !embed &&
          "md:mx-auto md:h-[844px] md:max-w-[390px] md:rounded-[36px] md:border-[10px] md:border-char md:shadow-none",
      )}
    >
      {mounted ? (
        <AppShell initialItemId={initialItemId} source={source} />
      ) : (
        <BootScreen />
      )}
    </div>
  );

  if (embed) return screen;

  return (
    <div className="relative md:flex md:min-h-[100dvh] md:flex-col md:items-center md:justify-center md:gap-5 md:bg-ember-deep md:px-6 md:py-10">
      <div
        aria-hidden
        className="flame-pattern pointer-events-none absolute inset-0 hidden md:block"
      />
      <div className="relative hidden w-full max-w-[390px] items-center justify-between md:flex">
        <Link
          href="/"
          className="font-display text-[11px] uppercase tracking-brand text-paper"
        >
          ← Back to the site
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper/70">
          Order ahead demo
        </span>
      </div>
      <div className="relative">{screen}</div>
      <p className="relative hidden max-w-[390px] text-center font-mono text-[10px] uppercase leading-relaxed tracking-wide text-paper/70 md:block">
        Mock ordering app · no payments are processed
      </p>
    </div>
  );
}

function BootScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-crema">
      <Flame className="h-12 w-auto text-ember" flicker />
      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-2">
        Warming up the app…
      </p>
    </div>
  );
}

function BootFrame() {
  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-crema">
      <BootScreen />
    </div>
  );
}
