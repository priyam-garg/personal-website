"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-triggered fade + rise, done in CSS.
 *
 * Content is visible in the server HTML. It is only hidden once the inline
 * script in layout.tsx has tagged <html> with `js`, so crawlers, link-preview
 * bots, slow connections and no-JS visitors always see the full page.
 * Reduced-motion users get no animation (see globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      data-shown={shown ? "" : undefined}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
