import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { BUSINESS } from "@/data/business";

export function SiteFooter() {
  return (
    <footer className="bg-char px-5 py-16 text-paper">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 text-center">
        <Logo variant="stacked" invert href="/" className="scale-90" />
        <p className="max-w-md font-sans text-sm font-light text-steel">
          {BUSINESS.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-wide">
          <a href={BUSINESS.fb} target="_blank" rel="noreferrer" className="hover:text-ember-glow">
            Facebook
          </a>
          <a href={BUSINESS.ig} target="_blank" rel="noreferrer" className="hover:text-ember-glow">
            Instagram
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="hover:text-ember-glow">
            Email
          </a>
          <Link href="/app" className="hover:text-ember-glow">
            Order ahead
          </Link>
          <Link href="/brand" className="hover:text-ember-glow">
            Brand
          </Link>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wide text-steel">
          Design concept — not the official Ignite site.
        </p>
      </div>
    </footer>
  );
}
