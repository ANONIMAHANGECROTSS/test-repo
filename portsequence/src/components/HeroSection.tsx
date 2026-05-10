import LandscapeThumbnail from "./LandscapeThumbnail";
import AboutCard from "./AboutCard";

export default function HeroSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 pt-10 lg:pt-16 pb-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="animate-slide-up">
          <LandscapeThumbnail />
        </div>
        <div className="animate-fade-in">
          <AboutCard />
        </div>
      </div>
    </section>
  );
}
