import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

/** Social preview card, generated at build time. Uses system fonts only. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          padding: "72px 80px",
          color: "#e9ebee",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: 999, background: "#4ade80" }}
          />
          <div style={{ fontSize: 26, color: "#99a1ac" }}>~/priyam-garg</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 38, color: "#4ade80" }}>
            Software Engineer · AI Systems
          </div>
          <div style={{ fontSize: 28, color: "#99a1ac", maxWidth: 900 }}>
            Multi-agent platforms, RAG pipelines and full-stack products.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            "LeetCode Knight · 1904",
            "Xpressbees",
            "AgileDone Tech",
            "LNMIIT '27",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#99a1ac",
                border: "1px solid #2b323c",
                borderRadius: 10,
                padding: "10px 20px",
                background: "#0d0f13",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
