import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from "react";

type Theme = "dark" | "light";
interface Ctx {
  theme: Theme;
  toggle: (origin?: { x: number; y: number }) => void;
}
const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as Theme) || "dark";
  });
  const [overlay, setOverlay] = useState<{ x: number; y: number; to: Theme } | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const o = origin || { x: window.innerWidth, y: 0 };
      setOverlay({ x: o.x, y: o.y, to: next });
      if (timer.current) window.clearTimeout(timer.current);
      window.setTimeout(() => setTheme(next), 600);
      timer.current = window.setTimeout(() => setOverlay(null), 1300);
    },
    [theme]
  );

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      {children}
      {overlay && (
        <div
          className="theme-wave-overlay"
          style={{
            ["--wx" as any]: `${overlay.x}px`,
            ["--wy" as any]: `${overlay.y}px`,
            background:
              overlay.to === "dark"
                ? "radial-gradient(circle at var(--wx) var(--wy), rgba(10,15,20,0.95), rgba(17,26,30,0.85))"
                : "radial-gradient(circle at var(--wx) var(--wy), rgba(232,244,253,0.95), rgba(255,255,255,0.85))",
          }}
        />
      )}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
}
