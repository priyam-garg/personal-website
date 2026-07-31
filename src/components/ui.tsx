import type { ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* Section shell                                                       */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Section header in the terminal idiom: a monospace command line above the
 * human-readable title. Keeps the "dev tooling" voice consistent site-wide.
 */
export function SectionHeading({
  index,
  command,
  title,
  description,
}: {
  index: string;
  command: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3 font-mono text-xs text-dim">
        <span className="text-accent">{index}</span>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <p className="mt-4 font-mono text-sm text-muted">
        <span className="text-accent">$</span> {command}
      </p>
      <h2 className="text-gradient mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Atoms                                                               */
/* ------------------------------------------------------------------ */

export function Chip({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-[3px] font-mono text-[11px] leading-5 whitespace-nowrap",
        tone === "accent"
          ? "border-accent/35 bg-accent-soft text-accent"
          : "border-line bg-elev2 text-muted",
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-line bg-elev",
        interactive &&
          "transition-colors duration-300 hover:border-line-strong",
        className,
      )}
      style={{ boxShadow: "var(--shadow)" }}
    >
      {children}
    </div>
  );
}

/** Small labelled figure used across the hero and stat rows. */
export function Stat({
  value,
  label,
  hint,
}: {
  value: ReactNode;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-2xl font-semibold tracking-tight text-fg tabular-nums sm:text-3xl">
        {value}
      </span>
      <span className="text-xs font-medium tracking-wide text-muted uppercase">
        {label}
      </span>
      {hint ? <span className="font-mono text-[11px] text-dim">{hint}</span> : null}
    </div>
  );
}

/** Marks a stat as fetched live vs. falling back to a hardcoded value. */
export function LiveDot({ live }: { live: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-dim uppercase"
      title={live ? "Fetched live from the source API" : "Showing last known value — API unreachable"}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          live ? "bg-accent" : "bg-[var(--fg-dim)]",
        )}
        aria-hidden
      />
      {live ? "live" : "cached"}
    </span>
  );
}
