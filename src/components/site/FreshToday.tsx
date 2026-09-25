import Link from "next/link";
import Image from "next/image";
import { PillButton } from "@/components/brand/PillButton";
import { Eyebrow, Reveal } from "@/components/brand/Reveal";
import { byId, money } from "@/data/menu";
import { POSTS } from "@/data/posts";

export function FreshToday() {
  const bakePost = POSTS.find((p) => p.bake?.length);
  const items = (bakePost?.bake ?? [])
    .map((id) => byId(id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <section id="fresh" className="bg-ember px-5 pb-20 md:pb-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-ember-tint px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ember-deep">
            ● Synced from Facebook · {bakePost?.date ?? "Aug 29"}
          </div>
          <Eyebrow className="text-paper">Fresh in the case</Eyebrow>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/85">
            {bakePost?.text}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) =>
            item ? (
              <Reveal key={item.id} delay={0.05 * i}>
                <article className="overflow-hidden rounded-[14px] bg-paper">
                  <div className="relative aspect-square">
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="240px"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm uppercase tracking-brand text-char">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-ink-2">
                      {money(typeof item.p === "number" ? item.p : item.p[12])}
                    </p>
                    <PillButton asChild size="sm" className="mt-4 w-full">
                      <Link href={`/app?item=${item.id}`}>Order</Link>
                    </PillButton>
                  </div>
                </article>
              </Reveal>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
