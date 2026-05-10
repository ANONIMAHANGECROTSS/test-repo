import { useState } from "react";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";

const photos = [
  "https://files.catbox.moe/2eeyie.jpg",
  "https://files.catbox.moe/3fzdj6.jpg",
  "https://files.catbox.moe/agolgb.jpg",
  "https://files.catbox.moe/r5odii.jpg",
];

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-gradient-to-b from-white to-[#F0F8FF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2c4a]">
            Gallery
          </h2>
          <p className="mt-2 text-sm text-[#5B7A99]">
            Some of my favorite shots
          </p>
        </div>

        <div className="hidden md:grid grid-cols-4 gap-6">
          {photos.map((src, i) => (
            <GalleryCard key={i} src={src} onClick={() => setActive(src)} />
          ))}
        </div>

        <div className="md:hidden gallery-scroll flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {photos.map((src, i) => (
            <div key={i} className="shrink-0 w-[70%]">
              <GalleryCard src={src} onClick={() => setActive(src)} />
            </div>
          ))}
        </div>
      </div>

      {active && <Lightbox src={active} onClose={() => setActive(null)} />}
    </section>
  );
}
