import { useEffect, useRef, useState } from "react";

// Auto-pick semua frame di src/assets/sequence/ezgif-frame-*.jpg
// Vite akan bundle & hash setiap file. Kalau folder kosong -> komponen tidak render.
const modules = import.meta.glob("../assets/sequence/ezgif-frame-*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const FRAMES: string[] = Object.keys(modules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((k) => modules[k]);

export default function ScrollSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload semua frame
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const imgs: HTMLImageElement[] = FRAMES.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        count++;
        setLoaded(count);
        if (count === FRAMES.length) setReady(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        count++;
        setLoaded(count);
        if (count === FRAMES.length) setReady(true);
      };
      return img;
    });
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);

  // Draw frame berdasarkan scroll progress
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const first = imagesRef.current[0];
    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const drawFrame = (idx: number) => {
      const img = imagesRef.current[idx];
      if (!img || !img.complete) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);
      // cover fit
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw = cw;
      let dh = ch;
      let dx = 0;
      let dy = 0;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
        dx = (cw - dw) / 2;
      } else {
        dw = cw;
        dh = cw / ir;
        dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    drawFrame(0);

    let raf = 0;
    let lastIdx = -1;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 saat section baru masuk dari bawah, 1 saat keluar atas
        const total = rect.height + vh;
        const passed = vh - rect.top;
        const p = Math.min(1, Math.max(0, passed / total));
        const idx = Math.min(
          FRAMES.length - 1,
          Math.max(0, Math.floor(p * (FRAMES.length - 1))),
        );
        if (idx !== lastIdx) {
          lastIdx = idx;
          drawFrame(idx);
        }
      });
    };

    const onResize = () => {
      setSize();
      drawFrame(lastIdx >= 0 ? lastIdx : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [ready]);

  if (FRAMES.length === 0) return null;
  const pct = Math.round((loaded / FRAMES.length) * 100);

  return (
    <section
      ref={sectionRef}
      aria-label="Scroll sequence"
      className="relative w-full"
      style={{ height: "180vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
            <div className="glass-soft rounded-full px-4 py-2 text-sm text-foreground/80">
              Loading sequence… {pct}%
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">
            scroll
          </span>
        </div>
      </div>
    </section>
  );
}
