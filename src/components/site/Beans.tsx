import Image from "next/image";
import Link from "next/link";
import { MENU } from "@/data/menu";
import { Eyebrow, Reveal } from "@/components/brand/Reveal";
import { PillButton } from "@/components/brand/PillButton";
import { Steam } from "@/components/brand/motifs";

export function Beans() {
  const bags = MENU.filter((m) => m.cat === "beans");
  return (
    <section className="bg-char px-5 py-20 text-paper md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <Eyebrow className="text-pine">Take Ignite home</Eyebrow>
          <p className="mx-auto mt-3 max-w-md text-steel">
            Whole bean bags — Fireside and Refined — ready for your pickup order.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {bags.map((bag, i) => (
            <Reveal key={bag.id} delay={0.08 * i}>
              <article className="relative flex flex-col items-center text-center">
                <Steam className="absolute -top-4 text-steel/40" />
                <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[14px]">
                  {bag.img && (
                    <Image
                      src={bag.img}
                      alt={bag.name}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  )}
                </div>
                <h3 className="mt-6 font-display text-xl uppercase tracking-brand">
                  {bag.name}
                </h3>
                <p className="mt-2 font-mono text-xs text-steel">{bag.desc}</p>
                <PillButton asChild variant="dark" size="sm" className="mt-6">
                  <Link href={`/app?item=${bag.id}`}>Add to pickup order</Link>
                </PillButton>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
