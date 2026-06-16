"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { hrefOf, targetOf, type LinkValue } from "../../lib/link";
import { parseJsonArray } from "../../lib/parse";
import {
  DEFAULT_MENU,
  GORGIAS_LOGO,
  type NavItem,
  type NavColumn,
  type NavShowcase,
  type NavGlyph,
  type NavLink,
} from "./navbar-data";

export interface NavbarProps {
  logoSrc?: string;
  logoAlt?: string;
  brandHref?: LinkValue;
  menuJson?: string;
  loginLabel?: string;
  loginHref?: LinkValue;
  demoLabel?: string;
  demoHref?: LinkValue;
  signupLabel?: string;
  signupHref?: LinkValue;
  /** Px scrolled before the bar switches to the translucent/blur style */
  scrollThreshold?: number;
}

const CLOSE_DELAY = 120;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="8"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={cn("mb-px transition-transform duration-200", open && "rotate-180")}
    >
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Glyph({ glyph }: { glyph: NavGlyph }) {
  if (glyph === "sparkle") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 2.5l1.6 4.3 4.4 1.7-4.4 1.7L10 14.5l-1.6-4.3L4 8.5l4.4-1.7L10 2.5z" fill="currentColor" />
        <path d="M15.5 2.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.6a2 2 0 113 1.7c-.6.4-1 .8-1 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="10" cy="13.4" r="0.85" fill="currentColor" />
    </svg>
  );
}

function NavLinkItem({ l }: { l: NavLink }) {
  if (l.description) {
    return (
      <a href={l.href} className="group/navlink flex flex-col gap-2">
        <span className="flex items-center gap-3">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-coral-soft text-ink">
            {l.glyph ? <Glyph glyph={l.glyph} /> : l.icon ? <img src={l.icon} alt="" className="size-5" /> : null}
          </span>
          <span className="text-sm font-medium leading-normal text-ink transition-opacity group-hover/navlink:opacity-70">
            {l.label}
          </span>
        </span>
        <span className="text-xs leading-normal text-ink/60">{l.description}</span>
      </a>
    );
  }
  return (
    <a href={l.href} className="group/navlink flex items-center gap-2">
      {l.icon && <img src={l.icon} alt="" className="size-5 shrink-0" />}
      <span className="text-sm font-medium leading-normal text-ink transition-opacity group-hover/navlink:opacity-70">
        {l.label}
      </span>
    </a>
  );
}

function ColumnBlock({ col }: { col: NavColumn }) {
  return (
    <div className="flex flex-col gap-4">
      {col.title && <span className="text-lg font-medium leading-normal text-ink">{col.title}</span>}
      <div className={cn("gap-3", col.grid ? "grid grid-cols-2 gap-x-10" : "flex flex-col")}>
        {col.links.map((l) => (
          <NavLinkItem key={l.label} l={l} />
        ))}
      </div>
      {col.footer && (
        <a href={col.footer.href} className="text-sm text-ink/60 hover:text-ink">
          {col.footer.label}
        </a>
      )}
    </div>
  );
}

function ShowcaseCard({ s, className }: { s: NavShowcase; className?: string }) {
  return (
    <a
      href={s.href}
      className={cn(
        "flex flex-col justify-between gap-6 rounded-xl border border-line bg-fog/60 p-6 transition-colors hover:border-coral-soft hover:bg-[#ffeae6]",
        className
      )}
    >
      {s.eyebrow && <span className="text-sm text-ink">{s.eyebrow}</span>}
      <div className="flex flex-col gap-1">
        <span className="text-lg font-medium leading-normal text-ink">{s.title}</span>
        {s.description && <span className="text-sm leading-normal text-ink/60">{s.description}</span>}
      </div>
    </a>
  );
}

function MegaPanel({ item }: { item: NavItem }) {
  const showcaseLeft = item.showcaseSide === "left";

  const columnsRow = (
    <div className="flex gap-10">
      {item.columns?.map((col, i) => (
        <div key={i} className={cn("flex-1", i > 0 && "border-l border-line pl-10")}>
          <ColumnBlock col={col} />
        </div>
      ))}
    </div>
  );

  // Left grouping: columns, with the optional tour strip stacked beneath them
  const content = (
    <div className="flex flex-1 flex-col gap-6">
      {columnsRow}
      {item.tour && (
        <a
          href={item.tour.href}
          className="rounded-xl bg-[#fdefec] px-6 py-5 text-base font-medium text-ink transition-colors hover:bg-[#ffe1da]"
        >
          {item.tour.label}
        </a>
      )}
    </div>
  );

  return (
    <div className="flex items-stretch gap-10 px-8 py-8">
      {showcaseLeft && item.showcase && <ShowcaseCard s={item.showcase} className="w-[340px] shrink-0" />}
      {content}
      {!showcaseLeft && item.showcase && (
        <ShowcaseCard s={item.showcase} className="w-[340px] shrink-0" />
      )}
    </div>
  );
}

export function Navbar({
  logoSrc = GORGIAS_LOGO,
  logoAlt = "Gorgias",
  brandHref = { href: "/" },
  menuJson = "",
  loginLabel = "Login",
  loginHref = { href: "/login" },
  demoLabel = "Book a demo",
  demoHref = { href: "/demo" },
  signupLabel = "Sign up free",
  signupHref = { href: "/signup" },
  scrollThreshold = 100,
}: NavbarProps) {
  const menu = parseJsonArray<NavItem>(menuJson, DEFAULT_MENU);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  // Roving tabindex across top-level items (incl. Pricing)
  const [focusIdx, setFocusIdx] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  const clearTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const open = (label: string) => {
    clearTimer();
    setActive(label);
  };
  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY);
  };

  const activeItem = menu.find((m) => m.label === active && m.columns);

  const onItemKeyDown = (e: React.KeyboardEvent, i: number, item: NavItem) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (i + dir + menu.length) % menu.length;
      setFocusIdx(next);
      itemRefs.current[next]?.focus();
    } else if (e.key === "Enter" && item.columns) {
      e.preventDefault();
      open(item.label);
      // focus first link in the panel once it renders
      requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
      });
    } else if (e.key === "Escape") {
      e.preventDefault();
      setActive(null);
      itemRefs.current[i]?.blur();
    }
  };

  // Close when focus leaves the whole nav
  const onWrapperBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) setActive(null);
  };

  return (
    <div className="font-sans antialiased">
      {/* ── Desktop ── */}
      <div
        ref={wrapperRef}
        className="fixed inset-x-0 top-6 z-[1000] mx-auto hidden w-full max-w-[75rem] overflow-hidden rounded-3xl shadow-[0_0_10px_rgba(26,30,35,0.1)] lg:block"
        onMouseEnter={clearTimer}
        onMouseLeave={scheduleClose}
        onBlur={onWrapperBlur}
      >
        <div
          className={cn(
            "flex items-center justify-between px-8 py-5 transition-colors",
            scrolled ? "bg-[rgba(250,250,250,0.7)] backdrop-blur-[15px]" : "bg-[#fafafa]"
          )}
        >
          <a href={hrefOf(brandHref)} className="shrink-0">
            <img src={logoSrc} alt={logoAlt} className="max-h-9 max-w-[8.75rem]" />
          </a>

          <nav className="flex items-center gap-1" aria-label="Primary">
            {menu.map((item, i) =>
              item.columns ? (
                <button
                  key={item.label}
                  type="button"
                  ref={(el) => { itemRefs.current[i] = el; }}
                  tabIndex={focusIdx === i ? 0 : -1}
                  aria-haspopup="true"
                  aria-expanded={active === item.label}
                  aria-controls={`nav-panel-${item.label}`}
                  onMouseEnter={() => { setFocusIdx(i); open(item.label); }}
                  onFocus={() => { setFocusIdx(i); open(item.label); }}
                  onKeyDown={(e) => onItemKeyDown(e, i, item)}
                  onClick={() => setActive((a) => (a === item.label ? null : item.label))}
                  className={cn(
                    "flex items-center gap-2 rounded-[2.5rem] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors",
                    active === item.label ? "bg-[#ffeae6]" : "hover:bg-[#ffeae6]"
                  )}
                >
                  {item.label}
                  <Chevron open={active === item.label} />
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  tabIndex={focusIdx === i ? 0 : -1}
                  onMouseEnter={() => { setFocusIdx(i); setActive(null); }}
                  onFocus={() => { setFocusIdx(i); setActive(null); }}
                  onKeyDown={(e) => onItemKeyDown(e, i, item)}
                  className="flex items-center rounded-[2.5rem] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors hover:bg-[#ffeae6]"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-8">
            <a href={hrefOf(loginHref)} className="text-sm font-medium text-ink hover:opacity-70">
              {loginLabel}
            </a>
            <div className="flex items-center gap-2">
              <Button variant="brand-dark" size="xl" nativeButton={false} render={<a href={hrefOf(demoHref)} target={targetOf(demoHref)} />}>
                {demoLabel}
              </Button>
              <Button variant="brand-ghost" size="xl" nativeButton={false} render={<a href={hrefOf(signupHref)} target={targetOf(signupHref)} />}>
                {signupLabel}
              </Button>
            </div>
          </div>
        </div>

        {/* Mega-menu panel */}
        {activeItem && (
          <div
            ref={panelRef}
            id={`nav-panel-${activeItem.label}`}
            role="region"
            aria-label={activeItem.label}
            className="border-t border-line bg-[rgba(250,250,250,0.7)] backdrop-blur-[15px] duration-150 animate-in fade-in"
          >
            <MegaPanel item={activeItem} />
          </div>
        )}
      </div>

      {/* ── Mobile ── */}
      <div className="fixed inset-x-0 top-6 z-[1000] mx-auto block w-full overflow-hidden rounded-3xl bg-[#fafafa] shadow-[0_0_10px_rgba(26,30,35,0.1)] lg:hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <a href={hrefOf(brandHref)} className="shrink-0">
            <img src={logoSrc} alt={logoAlt} className="max-h-8 max-w-[6rem]" />
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="relative h-4 w-7"
          >
            <span className={cn("absolute left-0 h-[1.5px] w-full bg-ink transition-all duration-200", mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0")} />
            <span className={cn("absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-ink transition-all duration-200", mobileOpen && "opacity-0")} />
            <span className={cn("absolute left-0 h-[1.5px] w-full bg-ink transition-all duration-200", mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0")} />
          </button>
        </div>

        {mobileOpen && (
          <div className="flex flex-col border-t border-line">
            {menu.map((item) =>
              item.columns ? (
                <div key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={mobileSection === item.label}
                    onClick={() => setMobileSection((s) => (s === item.label ? null : item.label))}
                    className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-medium text-ink"
                  >
                    {item.label}
                    <Chevron open={mobileSection === item.label} />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      mobileSection === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-4 px-6 pb-5">
                        {item.columns.map((col, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            {col.title && (
                              <span className="text-xs font-medium uppercase tracking-wide text-ink/50">
                                {col.title}
                              </span>
                            )}
                            {col.links.map((l) => (
                              <a key={l.label} href={l.href} className="flex items-center gap-2 text-sm text-ink">
                                {l.icon && <img src={l.icon} alt="" className="size-5 shrink-0" />}
                                {l.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a key={item.label} href={item.href} className="border-b border-line px-6 py-5 text-base font-medium text-ink">
                  {item.label}
                </a>
              )
            )}
            <div className="flex flex-col gap-3 p-6">
              <Button variant="brand-dark" size="xl" className="w-full" nativeButton={false} render={<a href={hrefOf(demoHref)} />}>
                {demoLabel}
              </Button>
              <Button variant="brand-ghost" size="xl" className="w-full" nativeButton={false} render={<a href={hrefOf(signupHref)} />}>
                {signupLabel}
              </Button>
              <a href={hrefOf(loginHref)} className="py-2 text-center text-sm font-medium text-ink">
                {loginLabel}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
