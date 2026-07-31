"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Phase = "typing" | "holding" | "erasing";
type State = { index: number; length: number; phase: Phase };

/**
 * Cycles through phrases with a type/erase effect.
 *
 * State advances only inside the timeout callback — a single state machine
 * stepped by a timer — so the effect body never triggers a cascading render.
 * With reduced motion enabled it simply shows the first phrase.
 */
export function Typewriter({
  phrases,
  typeMs = 55,
  eraseMs = 28,
  holdMs = 1900,
  className,
}: {
  phrases: string[];
  typeMs?: number;
  eraseMs?: number;
  holdMs?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [state, setState] = useState<State>({ index: 0, length: 0, phase: "typing" });

  const { index, length, phase } = state;

  useEffect(() => {
    if (reduced || phrases.length === 0) return;

    const delay = phase === "holding" ? holdMs : phase === "erasing" ? eraseMs : typeMs;

    const timer = setTimeout(() => {
      setState((prev) => {
        const current = phrases[prev.index % phrases.length];

        if (prev.phase === "typing") {
          return prev.length >= current.length
            ? { ...prev, phase: "holding" }
            : { ...prev, length: prev.length + 1 };
        }

        if (prev.phase === "holding") return { ...prev, phase: "erasing" };

        return prev.length <= 0
          ? { index: (prev.index + 1) % phrases.length, length: 0, phase: "typing" }
          : { ...prev, length: prev.length - 1 };
      });
    }, delay);

    return () => clearTimeout(timer);
    // `index`/`length` are read to re-arm the timer after every step.
  }, [phase, index, length, phrases, reduced, typeMs, eraseMs, holdMs]);

  const visible = reduced
    ? (phrases[0] ?? "")
    : (phrases[index % phrases.length] ?? "").slice(0, length);

  return (
    <span className={className}>
      <span>{visible}</span>
      <span className="caret ml-0.5" aria-hidden />
    </span>
  );
}
