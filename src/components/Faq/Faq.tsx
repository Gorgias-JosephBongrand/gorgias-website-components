"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { parseJsonArray, splitList } from "../../lib/parse";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqItem } from "./faq-data";

export interface FaqProps {
  /** Category names — separate with | . Blank = built-in defaults. */
  categories?: string[] | string;
  /** FAQ items as JSON ([{cat, q, a}]). Blank = built-in defaults. */
  itemsJson?: string;
}

export function Faq({ categories = "", itemsJson = "" }: FaqProps) {
  const cats = useMemo(() => {
    if (Array.isArray(categories)) return categories;
    const parsed = splitList(categories);
    return parsed.length > 0 ? parsed : FAQ_CATEGORIES;
  }, [categories]);

  const items = useMemo(() => parseJsonArray(itemsJson, FAQ_ITEMS), [itemsJson]);

  const [activeCat, setActiveCat] = useState(cats[0]);
  const [open, setOpen] = useState(0);

  const visible = items.filter((it) => it.cat === activeCat);

  return (
    <div className="grid grid-cols-1 items-start gap-12 font-sans antialiased md:grid-cols-[360px_1fr]">
      {/* Category nav */}
      <div className="flex flex-col gap-6 rounded-2xl border border-line bg-fog p-6">
        {cats.map((c) => {
          const active = c === activeCat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                setActiveCat(c);
                setOpen(0);
              }}
              className={cn(
                "flex h-12 cursor-pointer items-center justify-between gap-2 rounded-lg px-6 py-3 text-left font-sans text-base font-medium leading-normal text-ink transition-colors",
                active ? "bg-white" : "bg-transparent hover:bg-white/50"
              )}
            >
              {c}
              {active && <span className="size-1.5 shrink-0 rounded-full bg-ink" />}
            </button>
          );
        })}
      </div>

      {/* Accordion */}
      <div className="flex flex-col">
        {visible.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="flex flex-col border-b border-[#e9e1d8]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex cursor-pointer items-center justify-between gap-6 border-0 bg-transparent py-5 text-left font-sans"
              >
                <span className="text-2xl leading-[1.3] text-black">{it.q}</span>
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-200 [box-shadow:inset_0_0_0_1.25px_#e6e1db]",
                    isOpen && "rotate-45"
                  )}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-6 pr-16 text-base leading-normal text-ink/75">{it.a}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
