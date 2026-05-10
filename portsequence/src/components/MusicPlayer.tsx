import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music, ChevronDown } from "lucide-react";
import LyricDisplay from "./LyricDisplay";

const SRC = "https://files.catbox.moe/yw53m2.mp3";
const COVER = "https://files.catbox.moe/4oh0hs.jpg";

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-[2px] bg-white/80 rounded-full ${playing ? "animate-eq" : "h-1"}`}
          style={playing ? { animationDelay: `${i * 0.15}s` } : {}}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCur(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd = () => {
      setPlaying(false);
      setCur(0);
      setResetKey((k) => k + 1);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [expanded]);

  const toggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    const bar = barRef.current;
    if (!a || !bar || !dur) return;
    const r = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    a.currentTime = pct * dur;
    setCur(a.currentTime);
  };

  const pct = dur ? (cur / dur) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className="fixed z-40 left-3 right-3 bottom-3 sm:left-4 sm:right-auto sm:bottom-4 sm:w-[360px] origin-bottom-left"
    >
      <audio ref={audioRef} src={SRC} preload="metadata" />

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Open music player"
          className="group w-full flex items-center gap-3 rounded-full backdrop-blur-2xl bg-black/40 dark:bg-black/40 border border-white/15 shadow-lg px-3 py-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-6px_rgba(96,165,250,0.55)] animate-mini-in"
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 border border-white/20 shrink-0">
            <Music className="w-[18px] h-[18px] text-white" />
          </span>
          <span className="flex-1 min-w-0 text-left">
            <span className="flex items-center gap-2">
              <span className="text-white text-sm font-medium truncate">Smoke it off</span>
              {playing && <Equalizer playing={playing} />}
            </span>
            <span className="block text-white/60 text-xs truncate">Lumi Athena</span>
          </span>
          <span
            onClick={toggle}
            role="button"
            aria-label={playing ? "Pause" : "Play"}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 border border-white/20 hover:scale-110 transition-transform shrink-0"
          >
            {playing ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </span>
        </button>
      )}

      {expanded && (
        <div className="rounded-2xl backdrop-blur-2xl bg-black/40 dark:bg-black/40 border border-white/15 shadow-2xl overflow-hidden animate-expand-in">
          <div
            className="relative h-[140px] bg-cover bg-center"
            style={{ backgroundImage: `url(${COVER})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Minimize"
              className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 border border-white/25 hover:scale-110 transition-transform"
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-2 left-3 right-3">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-lg leading-tight">Smoke it off</h3>
                {playing && <Equalizer playing={playing} />}
              </div>
              <p className="text-white/70 text-xs">Lumi Athena</p>
            </div>
          </div>
          <div className="p-3 space-y-3">
            <LyricDisplay playing={playing} resetKey={resetKey} />
            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center hover:scale-110 transition-transform shrink-0"
              >
                {playing ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white ml-0.5" />
                )}
              </button>
              <div className="flex-1">
                <div
                  ref={barRef}
                  onClick={seek}
                  className="relative h-1.5 rounded-full bg-white/20 cursor-pointer"
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-[width] duration-150"
                    style={{ width: `${pct}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow"
                    style={{ left: `calc(${pct}% - 6px)` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-white/60 tabular-nums">
                  <span>{fmt(cur)}</span>
                  <span>{fmt(dur)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
