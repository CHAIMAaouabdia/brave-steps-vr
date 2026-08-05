import { useEffect, useState } from "react";

const COLORS = [
  "var(--primary)",
  "var(--emerald)",
  "var(--violet)",
  "var(--sky)",
  "var(--warning)",
];

export function Confetti({ fire }: { fire: boolean }) {
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    if (!fire) return;
    setPieces(Array.from({ length: 80 }, (_, i) => i));
    const t = setTimeout(() => setPieces([]), 3000);
    return () => clearTimeout(t);
  }, [fire]);

  if (!pieces.length) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map((i) => (
        <span
          key={i}
          className="gp-confetti-piece"
          style={{
            left: `${(i * 1.27) % 100}%`,
            background: COLORS[i % COLORS.length],
            animationDelay: `${(i % 12) * 0.09}s`,
            animationDuration: `${2 + ((i % 7) * 0.2)}s`,
          }}
        />
      ))}
    </div>
  );
}
