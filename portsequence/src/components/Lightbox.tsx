import { useEffect } from "react";
import { X } from "lucide-react";

type Props = { src: string; onClose: () => void };

export default function Lightbox({ src, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white hover:scale-110 transition"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={src}
        alt="Preview"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
      />
    </div>
  );
}
