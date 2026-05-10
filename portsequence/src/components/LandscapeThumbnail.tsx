import { MapPin } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

export default function LandscapeThumbnail() {
  return (
    <div className="glass rounded-3xl p-2 h-full">
      <div className="relative rounded-2xl overflow-hidden h-[320px] sm:h-[400px] lg:h-[460px]">
        <img
          src="https://files.catbox.moe/a59rm7.jpg"
          alt="Kevin Velvet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 gap-3">
          <h1 className="text-white font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">
            Kevin Velvet
          </h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Bandung, Indonesia</span>
          </div>
          <div className="pt-2">
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </div>
  );
}
