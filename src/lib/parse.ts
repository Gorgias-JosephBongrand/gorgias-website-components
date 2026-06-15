/**
 * Shared parsers for Webflow text props.
 * Webflow exposes single-line text inputs, so list-like data is passed
 * either as a JSON string or as a separator-delimited string.
 */

/**
 * Parse a JSON string into a non-empty array, falling back on any error.
 * Used by every component that exposes editable list data as a JSON prop.
 */
export function parseJsonArray<T>(json: string | undefined, fallback: T[]): T[] {
  if (!json?.trim()) return fallback;
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed) || parsed.length === 0) return fallback;
    return parsed as T[];
  } catch {
    return fallback;
  }
}

/** Split a Webflow single-line text prop into list items: | ; or newline. */
export function splitList(s: string): string[] {
  return s
    .split(/\r?\n|\||;/)
    .map((t) => t.trim())
    .filter(Boolean);
}
