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
      "Local & toll-free numbers, US + international",
      "Call queues, IVR & smart routing",
      "Recording & transcripts on every call",
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
      "Two-way texting in your helpdesk",
      "MMS (image) support",
      "Works with your marketing tools (Klaviyo, Attentive & more)",
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14.0497 6C15.0264 6.19057 15.924 6.66826 16.6277 7.37194C17.3314 8.07561 17.8091 8.97326 17.9997 9.95M14.0497 2C16.0789 2.22544 17.9713 3.13417 19.4159 4.57701C20.8606 6.01984 21.7717 7.91101 21.9997 9.94M10.2266 13.8631C9.02506 12.6615 8.07627 11.3028 7.38028 9.85323C7.32041 9.72854 7.29048 9.66619 7.26748 9.5873C7.18576 9.30695 7.24446 8.96269 7.41447 8.72526C7.46231 8.65845 7.51947 8.60129 7.63378 8.48698C7.98338 8.13737 8.15819 7.96257 8.27247 7.78679C8.70347 7.1239 8.70347 6.26932 8.27247 5.60643C8.15819 5.43065 7.98338 5.25585 7.63378 4.90624L7.43891 4.71137C6.90747 4.17993 6.64174 3.91421 6.35636 3.76987C5.7888 3.4828 5.11854 3.4828 4.55098 3.76987C4.2656 3.91421 3.99987 4.17993 3.46843 4.71137L3.3108 4.86901C2.78117 5.39863 2.51636 5.66344 2.31411 6.02348C2.08969 6.42298 1.92833 7.04347 1.9297 7.5017C1.93092 7.91464 2.01103 8.19687 2.17124 8.76131C3.03221 11.7947 4.65668 14.6571 7.04466 17.045C9.43264 19.433 12.295 21.0575 15.3284 21.9185C15.8928 22.0787 16.1751 22.1588 16.588 22.16C17.0462 22.1614 17.6667 22 18.0662 21.7756C18.4263 21.5733 18.6911 21.3085 19.2207 20.7789L19.3783 20.6213C19.9098 20.0898 20.1755 19.8241 20.3198 19.5387C20.6069 18.9712 20.6069 18.3009 20.3198 17.7333C20.1755 17.448 19.9098 17.1822 19.3783 16.6508L19.1835 16.4559C18.8339 16.1063 18.6591 15.9315 18.4833 15.8172C17.8204 15.3862 16.9658 15.3862 16.3029 15.8172C16.1271 15.9315 15.9523 16.1063 15.6027 16.4559C15.4884 16.5702 15.4313 16.6274 15.3644 16.6752C15.127 16.8453 14.7828 16.904 14.5024 16.8222C14.4235 16.7992 14.3612 16.7693 14.2365 16.7094C12.7869 16.0134 11.4282 15.0646 10.2266 13.8631Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20.9996 11.5C20.9996 16.1944 17.194 20 12.4996 20C11.4228 20 10.3928 19.7998 9.44478 19.4345C9.27145 19.3678 9.18478 19.3344 9.11586 19.3185C9.04807 19.3029 8.999 19.2963 8.92949 19.2937C8.85881 19.291 8.78127 19.299 8.62619 19.315L3.50517 19.8444C3.01692 19.8948 2.7728 19.9201 2.6288 19.8322C2.50337 19.7557 2.41794 19.6279 2.3952 19.4828C2.36909 19.3161 2.48575 19.1002 2.71906 18.6684L4.35472 15.6408C4.48942 15.3915 4.55677 15.2668 4.58728 15.1469C4.6174 15.0286 4.62469 14.9432 4.61505 14.8214C4.60529 14.6981 4.55119 14.5376 4.443 14.2166C4.15547 13.3636 3.99962 12.45 3.99962 11.5C3.99962 6.80558 7.8052 3 12.4996 3C17.194 3 20.9996 6.80558 20.9996 11.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
