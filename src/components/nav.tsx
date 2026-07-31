"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/content";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "./ui";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently owns the upper half of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-[var(--bg)]/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm font-medium"
        >
          <span className="text-accent">~/</span>
          <span className="text-fg">{profile.handle}</span>
          <span className="caret" aria-hidden />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "rounded-md px-3 py-1.5 font-mono text-[13px] transition-colors",
                  active === item.id
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumePath}
            download
            className="hidden items-center gap-2 rounded-md border border-line bg-elev px-3 py-2 font-mono text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
          >
            <Download className="size-3.5" strokeWidth={1.75} />
            Résumé
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-md border border-line bg-elev text-muted transition-colors hover:text-fg md:hidden"
          >
            {open ? (
              <X className="size-4" strokeWidth={1.75} />
            ) : (
              <Menu className="size-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line bg-[var(--bg)]/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/60 py-3 font-mono text-sm text-muted transition-colors last:border-0 hover:text-fg"
                >
                  <span className="text-accent">→</span> {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumePath}
                download
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-md border border-accent/35 bg-accent-soft py-2.5 font-mono text-sm text-accent"
              >
                <Download className="size-3.5" strokeWidth={1.75} />
                Download résumé
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
