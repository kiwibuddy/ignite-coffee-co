import Image from "next/image";
import { Reveal, Eyebrow } from "@/components/brand/Reveal";
import { POSTS } from "@/data/posts";
import { BUSINESS } from "@/data/business";

export function PatioBlock() {
  const patio =
    POSTS.find((p) => p.quote) ??
    POSTS.find((p) => p.text.toLowerCase().includes("patio"));

  return (
    <section className="bg-ember px-5 py-16 text-paper md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Image
              src="/assets/img/photos/patio-exterior.jpg"
              alt="Patio seating at Ignite Coffee Co."
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow className="text-paper">Find us</Eyebrow>
          <h2 className="mt-4 font-display text-2xl uppercase leading-snug tracking-[0.08em] text-paper md:text-3xl">
            Find us at {BUSINESS.addr}. Look for the green posts, the hanging
            baskets & a sign that says come in, we&apos;re open.
          </h2>
          {patio && (
            <p className="mt-8 border-l-2 border-paper/50 pl-4 font-sans text-base italic leading-relaxed text-paper/85">
              “{patio.text}”
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
