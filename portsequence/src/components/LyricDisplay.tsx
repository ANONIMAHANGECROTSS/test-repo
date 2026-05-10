import { useEffect, useState } from "react";

const LYRICS: { text: string; dur: number }[] = [
  { text: "I see you tryna hang with the gang, yeah", dur: 4 },
  { text: "Bad lil' bitch, she like the glises on my chain, yeah", dur: 5 },
  { text: "I heard you was talking, right? This, here and there, right?", dur: 6 },
  { text: "I heard you was talking, right? I heard you was talking, right?", dur: 5 },
];

export default function LyricDisplay({ playing, resetKey }: { playing: boolean; resetKey: number }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setIdx(0);
    setVisible(true);
  }, [resetKey]);

  useEffect(() => {
    if (!playing) return;
    const cur = LYRICS[idx];
    const fadeOut = window.setTimeout(() => setVisible(false), cur.dur * 1000 - 500);
    const next = window.setTimeout(() => {
      setIdx((i) => (i + 1) % LYRICS.length);
      setVisible(true);
    }, cur.dur * 1000);
    return () => {
      window.clearTimeout(fadeOut);
      window.clearTimeout(next);
    };
  }, [idx, playing]);

  return (
    <div className="glass-soft rounded-xl px-3 py-2 min-h-[44px] flex items-center justify-center">
      <p
        className={`text-center italic text-sm font-medium text-white/90 transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {LYRICS[idx].text}
      </p>
    </div>
  );
}
