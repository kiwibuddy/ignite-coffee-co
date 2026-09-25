"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { PillButton } from "@/components/brand/PillButton";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled ? "bg-char/95 text-paper" : "bg-transparent text-paper",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:h-20">
          <button
            type="button"
            className="font-display text-xs uppercase tracking-brand md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
          <Link
            href="#menu"
            className="hidden font-display text-xs uppercase tracking-brand md:inline"
          >
            Menu
          </Link>
          <Logo
            variant="mark"
            className="text-paper"
            invert
          />
          <PillButton asChild variant="dark" size="sm">
            <Link href="/app">Order ahead</Link>
          </PillButton>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-char text-paper md:hidden">
          <div className="flex items-center justify-between px-5 py-5">
            <Logo variant="horizontal" invert href={null} />
            <button
              type="button"
              className="font-display text-xs uppercase tracking-brand"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8 font-display text-2xl uppercase tracking-brand">
            {[
              ["#menu", "Menu"],
              ["#fresh", "Fresh today"],
              ["#facebook", "Facebook"],
              ["#reviews", "Reviews"],
              ["#visit", "Visit"],
              ["/app", "Order ahead"],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
