"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { LineArt } from "@/components/brand/LineArt";
import type { MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

type ArtKind = "cup" | "bean" | "scone" | "bag" | "generic";

export function artKind(item?: MenuItem): ArtKind {
  if (!item) return "generic";
  if (item.cat === "beans") return "bag";
  if (item.bake) return "scone";
  return "cup";
}

export function Thumb({
  item,
  size = 56,
  height,
  className,
}: {
  item?: MenuItem;
  size?: number;
  height?: number;
  className?: string;
}) {
  const box = { width: size, height: height ?? size };

  if (item?.img) {
    return (
      <Image
        src={item.img}
        alt=""
        width={box.width}
        height={box.height}
        style={box}
        className={cn(
          "shrink-0 rounded-[10px] border border-line object-cover",
          className,
        )}
      />
    );
  }

  return (
    <span
      style={box}
      className={cn(
        "grid shrink-0 place-items-center rounded-[10px] border border-line bg-ember-tint/70",
        className,
      )}
    >
      <LineArt
        kind={artKind(item)}
        className="h-1/2 w-1/2 text-ember"
      />
    </span>
  );
}

export function Chip({
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors",
        active
          ? "border-ember bg-ember text-paper"
          : "border-line bg-paper text-ink-2 hover:border-ember/60 hover:text-char",
        className,
      )}
      {...props}
    />
  );
}

export function Stepper({
  qty,
  onChange,
  removable = false,
  className,
}: {
  qty: number;
  onChange: (qty: number) => void;
  removable?: boolean;
  className?: string;
}) {
  const atFloor = qty <= 1;
  const DownIcon = removable && atFloor ? Trash2 : Minus;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-paper",
        className,
      )}
    >
      <button
        type="button"
        aria-label={removable && atFloor ? "Remove item" : "One fewer"}
        disabled={atFloor && !removable}
        onClick={() => onChange(qty - 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-ember disabled:text-line"
      >
        <DownIcon className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-6 text-center font-mono text-sm text-char">{qty}</span>
      <button
        type="button"
        aria-label="One more"
        onClick={() => onChange(qty + 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-ember"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}

export function SectionTitle({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-3", className)}>
      <h2 className="font-display text-[11px] uppercase tracking-brand text-ink-2">
        {children}
      </h2>
      {action}
    </div>
  );
}

export function OptionGroup({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
          {label}
        </span>
        {hint ? (
          <span className="font-mono text-[10px] text-ink-2/80">{hint}</span>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-[12px] border px-3 py-2.5 text-left transition-colors",
        checked ? "border-ember bg-ember-tint/50" : "border-line bg-paper",
      )}
    >
      <span>
        <span className="block text-sm text-char">{label}</span>
        {hint ? (
          <span className="block font-mono text-[10px] text-ink-2">{hint}</span>
        ) : null}
      </span>
      <span
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
          checked ? "border-ember bg-ember text-paper" : "border-line text-transparent",
        )}
      >
        <Check className="h-3 w-3" />
      </span>
    </button>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[14px] border border-dashed border-line bg-paper px-5 py-8 text-center">
      <LineArt kind="cup" className="mx-auto h-10 w-10 text-ember/60" />
      <p className="mt-3 font-display text-sm uppercase tracking-brand text-char">
        {title}
      </p>
      <p className="mx-auto mt-1.5 max-w-[26ch] text-xs text-ink-2">{body}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
