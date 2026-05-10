import { Phone } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/62882000856035"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-md border border-white/40 pl-3 pr-5 py-2 text-white text-sm transition-all duration-300 hover:scale-110 glow-green"
    >
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/25 border border-white/40">
        <Phone className="w-4 h-4" />
      </span>
      <span className="font-medium">Chat WhatsApp</span>
    </a>
  );
}
