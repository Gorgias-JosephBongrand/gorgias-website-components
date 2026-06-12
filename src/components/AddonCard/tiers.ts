/*
 * Voice & SMS add-on tier data — mirrored from v2-addons.jsx.
 * Each tier: included monthly allowance + monthly/annual contract rates.
 * Tier ranges for the dropdown span (prev.incl + 1) … tier.incl.
 * Pay-as-you-go tier (incl: 0) removed per design review.
 */

export interface TierRates {
  base: number;
  perTicket: number;
  overage: number;
}

export interface Tier {
  incl: number;
  monthly: TierRates;
  annual: TierRates;
}

export const VOICE_TIERS: Tier[] = [
  { incl: 25,    monthly: { base: 30,   perTicket: 1.2,  overage: 2.2  }, annual: { base: 25,   perTicket: 1.0,  overage: 2.2  } },
  { incl: 75,    monthly: { base: 90,   perTicket: 1.2,  overage: 2.0  }, annual: { base: 75,   perTicket: 1.0,  overage: 2.0  } },
  { incl: 150,   monthly: { base: 135,  perTicket: 0.9,  overage: 1.8  }, annual: { base: 113,  perTicket: 0.75, overage: 1.8  } },
  { incl: 250,   monthly: { base: 175,  perTicket: 0.7,  overage: 1.4  }, annual: { base: 146,  perTicket: 0.58, overage: 1.4  } },
  { incl: 500,   monthly: { base: 250,  perTicket: 0.5,  overage: 1.0  }, annual: { base: 208,  perTicket: 0.42, overage: 1.0  } },
  { incl: 1000,  monthly: { base: 400,  perTicket: 0.4,  overage: 0.8  }, annual: { base: 333,  perTicket: 0.33, overage: 0.8  } },
  { incl: 1500,  monthly: { base: 540,  perTicket: 0.36, overage: 0.72 }, annual: { base: 450,  perTicket: 0.3,  overage: 0.72 } },
  { incl: 3000,  monthly: { base: 972,  perTicket: 0.32, overage: 0.65 }, annual: { base: 810,  perTicket: 0.27, overage: 0.65 } },
  { incl: 5000,  monthly: { base: 1458, perTicket: 0.29, overage: 0.58 }, annual: { base: 1215, perTicket: 0.24, overage: 0.58 } },
  { incl: 7500,  monthly: { base: 1750, perTicket: 0.23, overage: 0.47 }, annual: { base: 1458, perTicket: 0.19, overage: 0.47 } },
  { incl: 10000, monthly: { base: 1866, perTicket: 0.19, overage: 0.37 }, annual: { base: 1555, perTicket: 0.16, overage: 0.37 } },
  { incl: 15000, monthly: { base: 2700, perTicket: 0.18, overage: 0.36 }, annual: { base: 2250, perTicket: 0.15, overage: 0.36 } },
  { incl: 20000, monthly: { base: 3360, perTicket: 0.17, overage: 0.34 }, annual: { base: 2800, perTicket: 0.14, overage: 0.34 } },
  { incl: 25000, monthly: { base: 3900, perTicket: 0.16, overage: 0.31 }, annual: { base: 3250, perTicket: 0.13, overage: 0.31 } },
  { incl: 30000, monthly: { base: 4320, perTicket: 0.14, overage: 0.29 }, annual: { base: 3600, perTicket: 0.12, overage: 0.29 } },
  { incl: 35000, monthly: { base: 5040, perTicket: 0.14, overage: 0.29 }, annual: { base: 4200, perTicket: 0.12, overage: 0.29 } },
  { incl: 41667, monthly: { base: 6300, perTicket: 0.15, overage: 0.29 }, annual: { base: 5250, perTicket: 0.13, overage: 0.29 } },
];

export const SMS_TIERS: Tier[] = [
  { incl: 25,    monthly: { base: 20,    perTicket: 0.8,  overage: 1.5  }, annual: { base: 17,    perTicket: 0.67, overage: 1.5  } },
  { incl: 75,    monthly: { base: 60,    perTicket: 0.8,  overage: 1.4  }, annual: { base: 50,    perTicket: 0.67, overage: 1.4  } },
  { incl: 150,   monthly: { base: 90,    perTicket: 0.6,  overage: 1.2  }, annual: { base: 75,    perTicket: 0.5,  overage: 1.2  } },
  { incl: 250,   monthly: { base: 140,   perTicket: 0.56, overage: 1.12 }, annual: { base: 117,   perTicket: 0.47, overage: 1.12 } },
  { incl: 500,   monthly: { base: 216,   perTicket: 0.43, overage: 0.87 }, annual: { base: 180,   perTicket: 0.36, overage: 0.87 } },
  { incl: 1000,  monthly: { base: 408,   perTicket: 0.41, overage: 0.82 }, annual: { base: 340,   perTicket: 0.34, overage: 0.82 } },
  { incl: 1500,  monthly: { base: 599,   perTicket: 0.4,  overage: 0.8  }, annual: { base: 499,   perTicket: 0.33, overage: 0.8  } },
  { incl: 3000,  monthly: { base: 1174,  perTicket: 0.39, overage: 0.78 }, annual: { base: 978,   perTicket: 0.33, overage: 0.78 } },
  { incl: 5000,  monthly: { base: 1939,  perTicket: 0.39, overage: 0.78 }, annual: { base: 1616,  perTicket: 0.32, overage: 0.78 } },
  { incl: 7500,  monthly: { base: 2897,  perTicket: 0.39, overage: 0.77 }, annual: { base: 2414,  perTicket: 0.32, overage: 0.77 } },
  { incl: 10000, monthly: { base: 3854,  perTicket: 0.39, overage: 0.77 }, annual: { base: 3212,  perTicket: 0.32, overage: 0.77 } },
  { incl: 15000, monthly: { base: 5768,  perTicket: 0.38, overage: 0.77 }, annual: { base: 4807,  perTicket: 0.32, overage: 0.77 } },
  { incl: 20000, monthly: { base: 7600,  perTicket: 0.38, overage: 0.76 }, annual: { base: 6333,  perTicket: 0.32, overage: 0.76 } },
  { incl: 25000, monthly: { base: 9500,  perTicket: 0.38, overage: 0.76 }, annual: { base: 7917,  perTicket: 0.32, overage: 0.76 } },
  { incl: 30000, monthly: { base: 11400, perTicket: 0.38, overage: 0.76 }, annual: { base: 9500,  perTicket: 0.32, overage: 0.76 } },
  { incl: 35000, monthly: { base: 13300, perTicket: 0.38, overage: 0.76 }, annual: { base: 11200, perTicket: 0.32, overage: 0.76 } },
  { incl: 40000, monthly: { base: 15200, perTicket: 0.38, overage: 0.76 }, annual: { base: 12800, perTicket: 0.32, overage: 0.76 } },
  { incl: 45000, monthly: { base: 17100, perTicket: 0.38, overage: 0.76 }, annual: { base: 14400, perTicket: 0.32, overage: 0.76 } },
  { incl: 50000, monthly: { base: 19000, perTicket: 0.38, overage: 0.76 }, annual: { base: 16000, perTicket: 0.32, overage: 0.76 } },
  { incl: 55000, monthly: { base: 20900, perTicket: 0.38, overage: 0.76 }, annual: { base: 18667, perTicket: 0.32, overage: 0.76 } },
];

export const fmtMoney = (n: number) => "$" + Number(n).toLocaleString("en-US");
export const fmtRate = (n: number | null | undefined) =>
  n == null ? "—" : "$" + n.toFixed(2);
export const fmtVol = (n: number) => n.toLocaleString("en-US");

/** "251 – 500 calls / month" */
export function tierRangeLabel(tiers: Tier[], i: number, unit: string) {
  const prevIncl = i === 0 ? 0 : tiers[i - 1].incl;
  return `${fmtVol(prevIncl + 1)} – ${fmtVol(tiers[i].incl)} ${unit} / month`;
}

export function parseTiers(json: string | undefined, fallback: Tier[]): Tier[] {
  if (!json?.trim()) return fallback;
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed) || parsed.length === 0) return fallback;
    return parsed as Tier[];
  } catch {
    return fallback;
  }
}
