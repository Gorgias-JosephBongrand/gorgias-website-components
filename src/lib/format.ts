/** Shared number/money formatting (US locale). */

export const fmtMoney = (n: number) => "$" + Number(n).toLocaleString("en-US");

export const fmtRate = (n: number | null | undefined) =>
  n == null ? "—" : "$" + n.toFixed(2);

export const fmtVol = (n: number) => Number(n).toLocaleString("en-US");
