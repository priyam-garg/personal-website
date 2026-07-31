"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * The <html data-theme> attribute is the source of truth — it's set by the
 * inline script in layout.tsx before first paint. We subscribe to it rather
 * than mirroring it into React state, which keeps the server and client
 * snapshots in agreement and avoids a hydration flash.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getSnapshot, () => "dark");

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked — the toggle still works for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="grid size-9 place-items-center rounded-md border border-line bg-elev text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {theme === "light" ? (
        <Moon className="size-4" strokeWidth={1.75} />
      ) : (
        <Sun className="size-4" strokeWidth={1.75} />
      )}
    </button>
  );
}
