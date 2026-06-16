import React from "react";
import { cn } from "@/lib/utils";
import { parseJsonArray, splitList } from "../../lib/parse";

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
      ["Overage", "$0.40/tkt", "$40/100", "$36/100", "$36/100"],
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
      ["Shopify / Shopify Plus", "check", "check", "check", "check"],
      ["WooCommerce", "check", "check", "check", "check"],
      ["BigCommerce", "—", "check", "check", "check"],
      ["Magento", "—", "—", "check", "check"],
      ["150+ app integrations", "check", "check", "check", "check"],
      ["Voice & SMS add-ons", "—", "check", "check", "check"],
    ],
  },
  {
    title: "Analytics",
    rows: [
      ["Support performance", "check", "check", "check", "check"],
      ["Revenue attribution", "—", "—", "check", "check"],
      ["Live statistics", "check", "check", "check", "check"],
      ["Automation statistics", "check", "check", "check", "check"],
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
      ["SSO (Google, Microsoft)", "check", "check", "check", "check"],
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect width="20" height="20" rx="10" fill="#E1FFE8" />
      <path d="M14 7L8.5 12.5L6 10" stroke="#1A1E23" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const parseSections = (json?: string): CompareSection[] =>
  parseJsonArray(json, DEFAULT_SECTIONS);

function Cell({ value }: { value: string }) {
  if (value === "check") {
    return (
      <span className="inline-flex">
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
      ? splitList(planNames)
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
                      <span className="inline-flex items-center whitespace-nowrap rounded-full bg-fog px-2.5 py-0.5 text-xs font-medium text-ink">
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
