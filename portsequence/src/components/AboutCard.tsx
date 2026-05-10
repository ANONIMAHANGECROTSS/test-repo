import { Code, Palette } from "lucide-react";

export default function AboutCard() {
  return (
    <div className="liquid-glass rounded-3xl p-2 h-full">
      <div className="rounded-[1.35rem] p-6 sm:p-8 h-full flex flex-col justify-center">
        <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: "var(--fg)" }}>
          About Me
        </h2>
        <p className="mt-4 leading-relaxed" style={{ color: "var(--fg)", opacity: 0.8 }}>
          Fullstack Developer & UI/UX Designer based in Bandung, Indonesia.
          Passionate about crafting beautiful, functional, and user-friendly
          web experiences.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-2 text-sm font-medium border border-white/30"
            style={{ color: "var(--fg)" }}
          >
            <Code className="w-4 h-4" />
            Fullstack Developer
          </span>
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium border border-white/25"
            style={{ color: "var(--fg)" }}
          >
            <Palette className="w-4 h-4" />
            UI/UX Designer
          </span>
        </div>
      </div>
    </div>
  );
}
