"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useIsMobile } from "./hooks";

type AppSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Always rendered for assistive tech; hide it visually with `hideTitle`. */
  title: string;
  eyebrow?: string;
  hideTitle?: boolean;
  children: React.ReactNode;
  className?: string;
};

/**
 * One sheet for the whole app: a bottom drawer on phones, a centred dialog
 * sized like the phone frame on desktop. Children are expected to be a
 * `SheetBody` plus an optional `SheetFooter`.
 */
export function AppSheet({
  open,
  onOpenChange,
  title,
  eyebrow,
  hideTitle = false,
  children,
  className,
}: AppSheetProps) {
  const isMobile = useIsMobile();

  const heading = (
    <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-wide text-ember">
            {eyebrow}
          </p>
        ) : null}
        {isMobile ? (
          <DrawerTitle
            className={cn(
              "font-display text-base uppercase tracking-brand text-char",
              hideTitle && "sr-only",
            )}
          >
            {title}
          </DrawerTitle>
        ) : (
          <DialogTitle
            className={cn("text-base", hideTitle && "sr-only")}
          >
            {title}
          </DialogTitle>
        )}
      </div>
      {isMobile ? (
        <DrawerClose
          aria-label="Close"
          className="-mr-1 -mt-1 shrink-0 rounded-full p-1 text-ink-2"
        >
          <X className="h-4 w-4" />
        </DrawerClose>
      ) : (
        <span className="w-4 shrink-0" aria-hidden />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} repositionInputs={false}>
        <DrawerContent
          className={cn("max-h-[92dvh] overflow-hidden", className)}
        >
          {heading}
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[84dvh] w-[390px] max-w-[92vw] flex-col gap-0 overflow-hidden rounded-[20px] p-0",
          className,
        )}
      >
        {heading}
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5",
        className,
      )}
      {...props}
    />
  );
}

export function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "shrink-0 space-y-2 border-t border-line bg-paper px-4 pt-3",
        "pb-[max(0.875rem,env(safe-area-inset-bottom))]",
        className,
      )}
      {...props}
    />
  );
}
