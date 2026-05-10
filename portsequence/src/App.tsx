import HeroSection from "./components/HeroSection";
import ScrollSequence from "./components/ScrollSequence";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import MusicPlayer from "./components/MusicPlayer";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col app-shell">
        <ThemeToggle />
        <HeroSection />
        <ScrollSequence />
        <Gallery />
        <Footer />
        <MusicPlayer />
      </div>
    </ThemeProvider>
  );
}
