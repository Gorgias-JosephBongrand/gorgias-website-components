/**
 * Webflow's Link prop hands the component an object { href, target, preload }.
 * Components type their link props as LinkValue so declareComponent maps them
 * to props.Link. Internally we also accept a plain string (computed hrefs,
 * preview usage); hrefOf / targetOf normalize either form.
 */
export interface LinkValue {
  href: string;
  target?: "_self" | "_blank" | string;
  preload?: "prerender" | "prefetch" | "none" | string;
}

type LinkInput = string | LinkValue | undefined | null;

export const hrefOf = (v?: LinkInput): string =>
  typeof v === "string" ? v : v?.href ?? "";

export const targetOf = (v?: LinkInput): string | undefined =>
  typeof v === "string" ? undefined : v?.target || undefined;
