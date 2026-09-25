"use client";

import { useState } from "react";
import Image from "next/image";
import { POSTS } from "@/data/posts";
import { BUSINESS } from "@/data/business";
import { Eyebrow, Reveal } from "@/components/brand/Reveal";
import { PillButton } from "@/components/brand/PillButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Post } from "@/data/posts";

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M14 8h2.5V5.5H14c-1.9 0-3.5 1.6-3.5 3.5v1.5H8V13h2.5v7H14v-7h2.2l.5-2.5H14V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function FacebookFeed() {
  const [active, setActive] = useState<Post | null>(null);
  const feed = POSTS.filter((p) => !p.quote);

  return (
    <section id="facebook" className="bg-ember px-5 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-leaf">
                <span className="inline-block h-2 w-2 rounded-full bg-leaf" /> Live
              </div>
              <Eyebrow className="text-paper">
                <span className="inline-flex items-center gap-2">
                  <FacebookGlyph className="h-4 w-4" /> From our Facebook
                </span>
              </Eyebrow>
              <p className="mt-2 font-mono text-xs text-paper/75">
                {BUSINESS.facebookFollowers}+ followers · 100% recommend
              </p>
            </div>
            <PillButton asChild size="sm" variant="dark">
              <a href={BUSINESS.fb} target="_blank" rel="noreferrer">
                Follow
              </a>
            </PillButton>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feed.map((post, i) => (
            <Reveal key={`${post.date}-${i}`} delay={0.04 * i}>
              <button
                type="button"
                onClick={() => setActive(post)}
                className={`w-full overflow-hidden rounded-[14px] text-left transition-transform hover:-translate-y-0.5 ${
                  post.img ? "bg-paper text-char" : "bg-char text-paper"
                }`}
              >
                {post.img && (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={post.img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="360px"
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-wide opacity-70">
                    {post.date}
                  </p>
                  <p className="mt-2 line-clamp-4 text-sm leading-relaxed">
                    {post.text}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wide opacity-70">
                    👍❤️😮 {post.r} · {post.c} comments · {post.s} shares
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center">
          <a
            href={BUSINESS.fb}
            className="font-display text-xs uppercase tracking-brand text-paper"
            target="_blank"
            rel="noreferrer"
          >
            See more on Facebook →
          </a>
        </p>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.date}</DialogTitle>
                <DialogDescription className="sr-only">
                  Facebook post
                </DialogDescription>
              </DialogHeader>
              {active.img && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                  <Image src={active.img} alt="" fill className="object-cover" />
                </div>
              )}
              <p className="text-sm leading-relaxed text-char">{active.text}</p>
              <p className="font-mono text-[10px] uppercase text-ink-2">
                {active.r} reactions · {active.c} comments · {active.s} shares
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
