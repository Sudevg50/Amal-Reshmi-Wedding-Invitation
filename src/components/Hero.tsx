import { useRef } from "react";
import { motion } from "framer-motion";
import { invite } from "../config/invite";
import PetalsCanvas from "./PetalsCanvas";

const OmSymbol = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="16" y="24" textAnchor="middle" fontSize="22" fill="#B8862F" fontFamily="serif">ॐ</text>
  </svg>
);

const ChevronDown = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L10 10L18 2" stroke="#B8862F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] as const } }
  };

  return (
    <section
      ref={ref}
      className="snap-section"
      style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, #FBF6EC 0%, #F4EBDD 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "100dvh",
      }}
    >
      {/* Petals / sparkles */}
      <PetalsCanvas />

      {/* Background artwork — Kerala Wedding Mandap & Floral Garland Arch with Couple */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}>
        <img
          src="/images/couple-floral.jpg"
          alt="Traditional Kerala Wedding Floral Arch & Couple"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        {/* Soft, proportional radial blend overlay for pristine typography contrast */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 48% at 50% 36%, rgba(251,246,236,0.92) 0%, rgba(251,246,236,0.55) 60%, transparent 100%)",
        }} />
        {/* Bottom subtle fade to ensure scroll prompt clarity */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "90px",
          background: "linear-gradient(to top, rgba(244,235,221,0.85) 0%, transparent 100%)",
        }} />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position:"relative", zIndex:2, display:"flex", flexDirection:"column",
          alignItems:"center", gap:"0.75rem", padding:"2.5rem 1.5rem 6.5rem",
          maxWidth: "430px", width: "100%",
        }}
      >
        <motion.div variants={item}>
          <OmSymbol />
        </motion.div>

        {/* Groom */}
        <motion.div variants={item} style={{ textAlign:"center" }}>
          <h1 style={{
            fontFamily:"Cinzel, serif", fontSize:"clamp(1.6rem,6.5vw,2.3rem)", fontWeight:600,
            color:"#4A3524", letterSpacing:"0.08em", lineHeight:1.1,
          }}>
            {invite.groom.fullName}
          </h1>
          <p style={{
            fontFamily:"Cormorant Garamond, serif", fontStyle:"italic",
            fontSize:"0.88rem", color:"#7A6450", marginTop:"0.25rem",
          }}>
            {invite.groom.sonOf}
          </p>
        </motion.div>

        {/* Ampersand */}
        <motion.div variants={item} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.25rem" }}>
          <div style={{ width:"36px", height:"1px", background:"linear-gradient(90deg,transparent,#B8862F,transparent)" }}/>
          <span style={{ fontFamily:"Cinzel, serif", fontSize:"1.5rem", color:"#B8862F", lineHeight:1 }}>&amp;</span>
          <div style={{ width:"36px", height:"1px", background:"linear-gradient(90deg,transparent,#B8862F,transparent)" }}/>
        </motion.div>

        {/* Bride */}
        <motion.div variants={item} style={{ textAlign:"center" }}>
          <h2 style={{
            fontFamily:"Cinzel, serif", fontSize:"clamp(1.6rem,6.5vw,2.3rem)", fontWeight:600,
            color:"#4A3524", letterSpacing:"0.08em", lineHeight:1.1,
          }}>
            {invite.bride.fullName}
          </h2>
          <p style={{
            fontFamily:"Cormorant Garamond, serif", fontStyle:"italic",
            fontSize:"0.88rem", color:"#7A6450", marginTop:"0.25rem",
          }}>
            {invite.bride.daughterOf}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"0.25rem",
        }}
      >
        <p style={{
          fontFamily:"Raleway, sans-serif", fontSize:"0.55rem", letterSpacing:"0.25em",
          textTransform:"uppercase", color:"#B8862F", marginBottom:"0.25rem",
        }}>Scroll</p>
        {[0,1,2].map(i => (
          <motion.div key={i}
            animate={{ y:[0,4,0], opacity:[0.3,1,0.3] }}
            transition={{ repeat:Infinity, duration:1.2, delay:i*0.2, ease:"easeInOut" }}
          >
            <ChevronDown />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
