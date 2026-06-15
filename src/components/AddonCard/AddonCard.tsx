"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "../../lib/icons";
import { fmtMoney, fmtRate, fmtVol } from "../../lib/format";
import { splitList } from "../../lib/parse";
import { BILLING_EVENT, type BillingCycle } from "../BillingToggle/BillingToggle";
import { SMS_TIERS, VOICE_TIERS, parseTiers, tierRangeLabel, type Tier } from "./tiers";

export type AddonKind = "voice" | "sms";

/**
 * Broadcast when an add-on's volume selection changes, so the plan-card
 * CTAs (in PricingPlans, a separate shadow root) can fold it into their
 * URLs. tickets = the selected tier's included volume, or null for "none".
 */
export const ADDON_EVENT = "gorgias:addon-change";
export interface AddonSelectionDetail {
  kind: AddonKind;
  tickets: number | null;
}

/** Per-kind content defaults — any prop left blank falls back to these. */
const KIND_DEFAULTS = {
  voice: {
    title: "Voice",
    tagline: "Phone support, inside your helpdesk",
    counted:
      "A conversation becomes a Voice ticket the moment a call connects. Unlimited follow-up calls on that ticket at no extra charge.",
    unit: "calls",
    tags: [
      "US & International",
      "Call recording & transcripts",
      "IVR & routing",
      "AI Agent voice handoff",
    ],
  },
  sms: {
    title: "SMS",
    tagline: "Two-way text conversations, on any plan",
    counted:
      "A conversation becomes an SMS ticket the moment a text is exchanged. Unlimited follow-up texts on that ticket at no extra charge.",
    unit: "texts",
    tags: [
      "Inbound & outbound",
      "Works with marketing tools",
      "MMS supported",
      "AI Agent answers on SMS",
    ],
  },
} as const;

export interface AddonCardProps {
  kind?: AddonKind;
  /** Blank = derived from Kind */
  title?: string;
  /** Blank = derived from Kind */
  tagline?: string;
  /** "How it's counted" body copy. Blank = derived from Kind */
  counted?: string;
  /** Capability tags — separate with | (or ; / newline). Blank = from Kind */
  tags?: string[] | string;
  /** Unit word in dropdown labels and Included stat. Blank = from Kind */
  unit?: string;
  /** Initial billing cycle; syncs with every BillingToggle on the page */
  defaultBilling?: BillingCycle;
  /** Initial dropdown tier index (0-based). -1 = "none" (default). */
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

function TierDropdown({
  tiers,
  unit,
  value,
  onChange,
  noneLabel,
}: {
  tiers: Tier[];
  unit: string;
  value: number;
  onChange: (i: number) => void;
  noneLabel: string;
}) {
  const labelFor = (i: number) => (i < 0 ? noneLabel : tierRangeLabel(tiers, i, unit));
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
        <span>{labelFor(value)}</span>
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
          {[-1, ...tiers.map((_, i) => i)].map((i) => (
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
              {labelFor(i)}
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
  title = "",
  tagline = "",
  counted = "",
  tags = "",
  unit = "",
  defaultBilling = "annual",
  defaultTierIndex = -1,
  tiersJson = "",
}: AddonCardProps) {
  const kindDefaults = KIND_DEFAULTS[kind === "sms" ? "sms" : "voice"];
  const resolvedTitle = title.trim() || kindDefaults.title;
  const resolvedTagline = tagline.trim() || kindDefaults.tagline;
  const resolvedCounted = counted.trim() || kindDefaults.counted;
  const resolvedUnit = unit.trim() || kindDefaults.unit;
  const noneLabel = `No ${resolvedTitle} tickets`;

  const [billing, setBilling] = useState<BillingCycle>(defaultBilling);
  const tiers = useMemo(
    () => parseTiers(tiersJson, kind === "voice" ? VOICE_TIERS : SMS_TIERS),
    [tiersJson, kind]
  );
  // -1 = "none"; otherwise clamp into the tier range
  const [tierIdx, setTierIdx] = useState(() =>
    defaultTierIndex < 0 ? -1 : Math.min(defaultTierIndex, tiers.length - 1)
  );

  // Sync with every BillingToggle on the page (cross shadow-root)
  useEffect(() => {
    const handler = (e: Event) => setBilling((e as CustomEvent<BillingCycle>).detail);
    window.addEventListener(BILLING_EVENT, handler);
    return () => window.removeEventListener(BILLING_EVENT, handler);
  }, []);

  const isNone = tierIdx < 0;
  const tier = isNone ? null : tiers[Math.min(tierIdx, tiers.length - 1)];
  const rates = tier ? (billing === "annual" ? tier.annual : tier.monthly) : null;
  // "None" state shows the cheapest entry point: "From $X" (first tier base)
  const firstTierBase = tiers[0]
    ? (billing === "annual" ? tiers[0].annual.base : tiers[0].monthly.base)
    : 0;
  const headlinePrice = rates ? rates.base : firstTierBase;

  // Broadcast the selection to the plan-card CTAs (fires on mount + change)
  useEffect(() => {
    const detail: AddonSelectionDetail = { kind, tickets: tier ? tier.incl : null };
    window.dispatchEvent(new CustomEvent<AddonSelectionDetail>(ADDON_EVENT, { detail }));
  }, [kind, tier]);

  const customTags = typeof tags === "string" ? splitList(tags) : tags;
  const tagList = customTags.length > 0 ? customTags : kindDefaults.tags;

  return (
    <article className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 font-sans text-ink antialiased [box-shadow:inset_0_0_0_1px_var(--color-line)]">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-line bg-white/90 text-ink [box-shadow:0_1.667px_2.5px_0_rgba(0,0,0,0.1)]">
          {kind === "sms" ? <ChatIcon /> : <PhoneIcon />}
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-lg font-medium leading-normal text-ink">{resolvedTitle}</span>
          <span className="text-base leading-normal text-ink/75">{resolvedTagline}</span>
        </div>
      </div>

      <div className="h-px bg-line" />

      {/* Price + how it's counted */}
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-2">
          {isNone && (
            <span className="pb-[5px] text-lg font-medium leading-normal text-ink/75">From</span>
          )}
          <span className="text-5xl font-medium leading-[1.2] tracking-[-0.01em] text-ink">
            {fmtMoney(headlinePrice)}
          </span>
          <span className="pb-[5px] text-lg font-medium leading-normal text-ink">
            /mo · {billing} pricing
          </span>
        </div>
        <span className="text-sm leading-normal tracking-[0.01em] text-ink/75">
          <span className="font-medium text-ink">How it&rsquo;s counted:</span> {resolvedCounted}
        </span>
      </div>

      {/* Volume estimate */}
      <div className="flex flex-col gap-2">
        <span className="text-base font-medium leading-normal text-ink">Estimate your volume</span>
        <TierDropdown
          tiers={tiers}
          unit={resolvedUnit}
          value={tierIdx}
          onChange={setTierIdx}
          noneLabel={noneLabel}
        />
      </div>

      {/* Included / Per ticket / Extra ticket */}
      <div className="grid grid-cols-3 gap-4">
        <TierStat label="Included" value={`${fmtVol(tier ? tier.incl : 0)} ${resolvedUnit}`} />
        <TierStat label="Per ticket" value={rates ? fmtRate(rates.perTicket) : "—"} divider />
        <TierStat
          label="Extra ticket"
          value={rates ? `${fmtRate(rates.overage)} each` : "—"}
          divider
        />
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
