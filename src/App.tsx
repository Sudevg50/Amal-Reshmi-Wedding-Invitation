import { useState, useEffect } from "react";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Hero from "./components/Hero";
import Details from "./components/Details";
import Countdown from "./components/Countdown";
import Families from "./components/Families";
import VenueMap from "./components/VenueMap";
import QuoteBlock from "./components/QuoteBlock";
import SaveTheDate from "./components/SaveTheDate";
import MusicToggle from "./components/MusicToggle";

export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  // Lock body scroll while envelope is shown
  useEffect(() => {
    if (!envelopeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [envelopeOpen]);

  return (
    <>
      <EnvelopeIntro isOpen={envelopeOpen} onOpen={() => setEnvelopeOpen(true)} />

      {/* Desktop centering shell */}
      <div style={{
        background: "#2C3818",
        backgroundImage: "radial-gradient(ellipse at 50% 30%, #46552B 0%, #1E2710 100%)",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "430px",
          overflow: "hidden",
          boxShadow: "0 20px 80px rgba(0,0,0,0.5), 0 0 120px rgba(46,58,26,0.4)",
          position: "relative",
          backgroundImage: "url('/images/damask-texture.jpg')",
          backgroundSize: "430px auto",
          backgroundRepeat: "repeat-y",
        }}>
          {/* Snap-scroll: Hero + Details */}
          <div className="snap-container" id="main-scroll">
            <Hero />
            <Details />
          </div>

          {/* Free-scroll content sections */}
          <Countdown />
          <Families />
          <VenueMap />
          <QuoteBlock />
          <SaveTheDate />
        </div>
      </div>

      <MusicToggle />
    </>
  );
}
