import type { ReactNode } from "react";

type InfoBoxProps = {
  title: string;
  children: ReactNode;
};

export function InfoBox({ title, children }: InfoBoxProps) {
  return (
    <div
      style={{
        flex: "1 1 300px",
        padding: "1rem",
        borderRadius: "12px",
        background: "#2d3748",
        color: "#f0f0f0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {children}
      </div>
    </div>
  );
}