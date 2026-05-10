type Props = { src: string; onClick: () => void };

export default function GalleryCard({ src, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group glass-soft rounded-2xl p-2 block w-full transition-all duration-500 hover:scale-105 glow-blue"
    >
      <div className="rounded-xl overflow-hidden aspect-[3/4]">
        <img
          src={src}
          alt="Gallery"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </button>
  );
}
