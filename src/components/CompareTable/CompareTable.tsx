import React from "react";
import { cn } from "@/lib/utils";

/*
 * Plan comparison table — mirrored from v2-page.jsx CompareTable +
 * V2_COMPARE_SECTIONS. Static content: sections are editable as JSON
 * in Webflow. Cell values: "check" renders a green check, "—" renders
 * a muted dash, anything else renders as text.
 */

export interface CompareSection {
  title: string;
  /** Each row: [label, starterCell, basicCell, proCell, advancedCell] */
  rows: string[][];
}

export const DEFAULT_SECTIONS: CompareSection[] = [
  {
    title: "Essentials",
    rows: [
      ["Tickets included", "50/mo", "300/mo", "2,000/mo", "5,000/mo"],
      ["User seats", "3", "500", "500", "500"],
      ["Overage", "$0.40/tkt", "$40/100", "$36/100", "$30/100"],
      ["API rate limit", "2 req/s", "2 req/s", "2 req/s", "2 req/s"],
    ],
  },
  {
    title: "AI Agent (included on every plan)",
    rows: [
      ["Per automated interaction", "$1.00", "$0.90", "$0.90", "$0.85"],
      ["Pre-trained on 18+ verticals", "check", "check", "check", "check"],
      ["Brand voice & guardrails", "—", "check", "check", "check"],
      ["Actions (cancel, discount, apply)", "—", "check", "check", "check"],
    ],
  },
  {
    title: "Channels & integrations",
    rows: [
      ["Email, chat, social, help center", "check", "check", "check", "check"],
      ["Shopify, BigCommerce, Magento", "check", "check", "check", "check"],
      ["150+ app integrations", "—", "check", "check", "check"],
      ["Voice & SMS add-ons", "—", "check", "check", "check"],
    ],
  },
  {
    title: "Analytics",
    rows: [
      ["Support performance", "check", "check", "check", "check"],
      ["Revenue attribution", "—", "—", "check", "check"],
      ["Live statistics", "—", "check", "check", "check"],
      ["Automation statistics", "—", "check", "check", "check"],
    ],
  },
  {
    title: "Support & onboarding",
    rows: [
      ["Tier", "Community", "Standard", "Specialist", "Dedicated"],
      ["Dedicated CSM", "—", "—", "—", "check"],
      ["Onboarding", "Self-serve", "Self-serve", "1:1 onboarding", "White-glove"],
      ["SLA", "—", "—", "—", "check"],
    ],
  },
  {
    title: "Security",
    rows: [
      ["SSO (Google, Microsoft)", "—", "check", "check", "check"],
      ["Audit logs", "—", "—", "check", "check"],
      ["GDPR / CCPA compliance", "check", "check", "check", "check"],
    ],
  },
];

export interface CompareTableProps {
  /** Plan column headers — separate with | */
  planNames?: string[] | string;
  /** 0-based index of the highlighted plan column (-1 = none) */
  featuredIndex?: number;
  featuredBadge?: string;
  /** Section data as JSON. Blank = built-in defaults. */
  sectionsJson?: string;
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function parseSections(json?: string): CompareSection[] {
  if (!json?.trim()) return DEFAULT_SECTIONS;
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_SECTIONS;
    return parsed as CompareSection[];
  } catch {
    return DEFAULT_SECTIONS;
  }
}

function Cell({ value }: { value: string }) {
  if (value === "check") {
    return (
      <span className="inline-flex text-green">
        <CheckIcon />
      </span>
    );
  }
  if (value === "—" || value === "-") {
    return <span className="text-[#a4a7ae]">—</span>;
  }
  return <>{value}</>;
}

export function CompareTable({
  planNames = "Starter | Basic | Pro | Advanced",
  featuredIndex = 2,
  featuredBadge = "Most popular",
  sectionsJson = "",
}: CompareTableProps) {
  const plans =
    typeof planNames === "string"
      ? planNames.split(/\r?\n|\||;/).map((p) => p.trim()).filter(Boolean)
      : planNames;
  const sections = parseSections(sectionsJson);
  const colCount = plans.length + 1;

  return (
    <div className="w-full overflow-x-auto font-sans antialiased">
      <div className="min-w-[720px] overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full border-separate border-spacing-0 text-base">
          <thead>
            <tr>
              <th className="w-[28%] border-b border-line bg-white p-6" />
              {plans.map((name, i) => (
                <th
                  key={name}
                  className={cn(
                    "w-[18%] border-b border-line p-6 text-left align-middle",
                    i === featuredIndex ? "bg-fog/60" : "bg-white"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium leading-normal text-ink">{name}</span>
                    {i === featuredIndex && featuredBadge && (
                      <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-full bg-fog px-2.5 py-0.5 text-xs font-medium text-ink">
                        <span className="size-1 rounded-full bg-coral" />
                        {featuredBadge}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <React.Fragment key={section.title}>
                <tr>
                  <td
                    colSpan={colCount}
                    className="bg-line px-6 py-4 text-lg font-medium leading-normal text-ink"
                  >
                    {section.title}
                  </td>
                </tr>
                {section.rows.map((row, ri) => {
                  const isLast = ri === section.rows.length - 1;
                  return (
                    <tr key={ri}>
                      <td
                        className={cn(
                          "px-6 py-4 text-left leading-normal text-ink",
                          !isLast && "border-b border-[#eeeeee]"
                        )}
                      >
                        {row[0]}
                      </td>
                      {row.slice(1).map((cell, ci) => (
                        <td
                          key={ci}
                          className={cn(
                            "px-6 py-4 text-left leading-normal text-ink/75",
                            !isLast && "border-b border-[#eeeeee]",
                            ci === featuredIndex && "bg-fog/60"
                          )}
                        >
                          <Cell value={cell} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
