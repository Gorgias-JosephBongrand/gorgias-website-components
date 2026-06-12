"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BILLING_EVENT, type BillingCycle } from "../BillingToggle/BillingToggle";
import {
  SMS_TIERS,
  VOICE_TIERS,
  fmtMoney,
  fmtRate,
  fmtVol,
  parseTiers,
  tierRangeLabel,
  type Tier,
} from "./tiers";

export type AddonKind = "voice" | "sms";

export interface AddonCardProps {
  kind?: AddonKind;
  title?: string;
  tagline?: string;
  /** "How it's counted" body copy (label is rendered bold automatically) */
  counted?: string;
  /** Capability tags — newline-separated string (Webflow) or array */
  tags?: string[] | string;
  /** Unit word used in dropdown labels and the Included stat */
  unit?: string;
  /** Initial billing cycle; syncs with every BillingToggle on the page */
  defaultBilling?: BillingCycle;
  /** Initial dropdown tier index (0-based). Design default: 4 → 251–500 */
  defaultTierIndex?: number;
  /** Optional tier-data override as JSON (same shape as the built-ins) */
  tiersJson?: string;
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 2.2a1 1 0 011-1h1.5a1 1 0 01.97.76l.5 2a1 1 0 01-.27.96l-.9.9a8 8 0 003.9 3.9l.9-.9a1 1 0 01.96-.27l2 .5a1 1 0 01.76.97V11a1 1 0 01-1 1A9.5 9.5 0 013 2.2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 6.5C2 4 4 2 6.5 2h1C10 2 12 4 12 6.5S10 11 7.5 11H4.5L2 12.5V6.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TierDropdown({
  tiers,
  unit,
  value,
  onChange,
}: {
  tiers: Tier[];
  unit: string;
  value: number;
  onChange: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      // composedPath: the real target survives shadow-DOM retargeting
      if (wrapRef.current && !e.composedPath().includes(wrapRef.current)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-[52px] w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border-0 bg-fog p-3.5 text-left font-sans text-base font-normal text-ink/75 transition-[box-shadow] duration-100",
          open
            ? "[box-shadow:inset_0_0_0_1px_var(--color-ink)]"
            : "[box-shadow:inset_0_0_0_1px_var(--color-line)]"
        )}
      >
        <span>{tierRangeLabel(tiers, value, unit)}</span>
        <span
          className={cn(
            "inline-flex text-ink/75 transition-transform duration-100",
            open && "rotate-180"
          )}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+4px)] z-20 max-h-[260px] overflow-y-auto rounded-lg border border-line bg-white p-1 [box-shadow:0_8px_20px_-8px_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.04)]"
        >
          {tiers.map((_, i) => (
            <button
              key={i}
              type="button"
              role="option"
              aria-selected={i === value}
              onClick={() => {
                onChange(i);
                setOpen(false);
              }}
              className={cn(
                "block w-full cursor-pointer rounded-[5px] border-0 px-3 py-2 text-left font-sans text-[13px] text-ink",
                i === value ? "bg-cream font-semibold" : "bg-transparent font-normal hover:bg-fog"
              )}
            >
              {tierRangeLabel(tiers, i, unit)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TierStat({
  label,
  value,
  divider,
}: {
  label: string;
  value: string;
  divider?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-0.5", divider && "border-l border-line pl-4")}>
      <span className="text-sm leading-normal tracking-[0.01em] text-ink/75">{label}</span>
      <span className="text-base font-bold leading-normal text-ink">{value}</span>
    </div>
  );
}

export function AddonCard({
  kind = "voice",
  title = "Voice",
  tagline = "Phone support, inside your helpdesk",
  counted = "A conversation becomes a Voice ticket the moment a call connects. Unlimited follow-up calls on that ticket at no extra charge.",
  tags = "US & International\nCall recording & transcripts\nIVR & routing\nAI Agent voice handoff",
  unit = "calls",
  defaultBilling = "annual",
  defaultTierIndex = 4,
  tiersJson = "",
}: AddonCardProps) {
  const [billing, setBilling] = useState<BillingCycle>(defaultBilling);
  const tiers = useMemo(
    () => parseTiers(tiersJson, kind === "voice" ? VOICE_TIERS : SMS_TIERS),
    [tiersJson, kind]
  );
  const [tierIdx, setTierIdx] = useState(() =>
    Math.min(Math.max(defaultTierIndex, 0), tiers.length - 1)
  );

  // Sync with every BillingToggle on the page (cross shadow-root)
  useEffect(() => {
    const handler = (e: Event) => setBilling((e as CustomEvent<BillingCycle>).detail);
    window.addEventListener(BILLING_EVENT, handler);
    return () => window.removeEventListener(BILLING_EVENT, handler);
  }, []);

  const tier = tiers[Math.min(tierIdx, tiers.length - 1)];
  const rates = billing === "annual" ? tier.annual : tier.monthly;
  const tagList =
    typeof tags === "string" ? tags.split("\n").map((t) => t.trim()).filter(Boolean) : tags;

  return (
    <article className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 font-sans text-ink antialiased [box-shadow:inset_0_0_0_1px_var(--color-line)]">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-line bg-white/90 text-ink [box-shadow:0_1.667px_2.5px_0_rgba(0,0,0,0.1)]">
          {kind === "voice" ? <PhoneIcon /> : <ChatIcon />}
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-lg font-medium leading-normal text-ink">{title}</span>
          <span className="text-base leading-normal text-ink/75">{tagline}</span>
        </div>
      </div>

      <div className="h-px bg-line" />

      {/* Price + how it's counted */}
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-medium leading-[1.2] tracking-[-0.01em] text-ink">
            {fmtMoney(rates.base)}
          </span>
          <span className="pb-[5px] text-lg font-medium leading-normal text-ink">
            /mo · {billing} pricing
          </span>
        </div>
        <span className="text-sm leading-normal tracking-[0.01em] text-ink/75">
          <span className="font-medium text-ink">How it&rsquo;s counted:</span> {counted}
        </span>
      </div>

      {/* Volume estimate */}
      <div className="flex flex-col gap-2">
        <span className="text-base font-medium leading-normal text-ink">Estimate your volume</span>
        <TierDropdown tiers={tiers} unit={unit} value={tierIdx} onChange={setTierIdx} />
      </div>

      {/* Included / Per ticket / Extra ticket */}
      <div className="grid grid-cols-3 gap-4">
        <TierStat label="Included" value={`${fmtVol(tier.incl)} ${unit}`} />
        <TierStat label="Per ticket" value={fmtRate(rates.perTicket)} divider />
        <TierStat label="Extra ticket" value={`${fmtRate(rates.overage)} each`} divider />
      </div>

      {/* Capability tags */}
      <div className="flex flex-wrap gap-4 border-t border-line pt-4">
        {tagList.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1.5 text-[13px] leading-normal text-ink/75"
          >
            <span className="inline-flex text-ink">
              <CheckIcon />
            </span>
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
