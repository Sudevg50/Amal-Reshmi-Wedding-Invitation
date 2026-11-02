import { motion } from "framer-motion";
import { invite } from "../config/invite";

const RingsIcon = () => (
  <svg width="52" height="26" viewBox="0 0 52 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="13" r="11" stroke="#B8862F" strokeWidth="1.5" fill="none" />
    <circle cx="34" cy="13" r="11" stroke="#B8862F" strokeWidth="1.5" fill="none" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] as const } }
};

export default function Details() {
  return (
    <section
      className="snap-section"
      style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, #F4EBDD 0%, #EDE0CC 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "100dvh",
      }}
    >
      {/* Background artwork — Traditional Temple Pillars & Hanging Nilavilakku Lamps */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}>
        <img
          src="/images/temple-arch.jpg"
          alt="Temple Arch & Nilavilakku Lamps"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        {/* Soft, proportional radial blend overlay for date & venue text contrast */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 84% 54% at 50% 50%, rgba(248,243,234,0.92) 0%, rgba(248,243,234,0.55) 65%, transparent 100%)",
        }} />
        {/* Top & bottom subtle transition fades */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "linear-gradient(to bottom, rgba(244,235,221,0.7) 0%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "linear-gradient(to top, rgba(237,224,204,0.7) 0%, transparent 100%)",
        }} />
      </div>

      <motion.div
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.12 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.3 }}
        style={{
          display:"flex", flexDirection:"column", alignItems:"center",
          gap:"1.2rem", padding:"2.5rem 1.5rem", maxWidth:"430px", width:"100%",
          position:"relative", zIndex:2,
        }}
      >
        {/* Pill label */}
        <motion.span variants={fadeUp} className="pill-label">Wedding</motion.span>

        {/* Rings */}
        <motion.div variants={fadeUp}>
          <RingsIcon />
        </motion.div>

        {/* Date */}
        <motion.div variants={fadeUp} style={{ textAlign:"center" }}>
          <p style={{
            fontFamily:"Raleway, sans-serif", fontSize:"0.6rem", fontWeight:600,
            letterSpacing:"0.3em", textTransform:"uppercase", color:"#7A6450",
            marginBottom:"0.5rem",
          }}>
            {invite.event.dayOfWeek}
          </p>
          <h2 style={{
            fontFamily:"Cinzel, serif", fontSize:"clamp(1.3rem,5.5vw,2rem)", fontWeight:600,
            color:"#B8862F", letterSpacing:"0.06em", lineHeight:1.2,
          }}>
            {invite.event.date.toUpperCase()}
          </h2>
          <p style={{
            fontFamily:"Cinzel, serif", fontSize:"clamp(1.1rem,4.5vw,1.5rem)", fontWeight:400,
            color:"#B8862F", letterSpacing:"0.08em", marginTop:"0.3rem",
          }}>
            {invite.event.timeDisplay}
          </p>
          <p style={{
            fontFamily:"Raleway, sans-serif", fontSize:"0.6rem", fontWeight:500,
            letterSpacing:"0.25em", textTransform:"uppercase", color:"#7A6450", marginTop:"0.5rem",
          }}>
            Muhurtham · {invite.event.muhurtham}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div variants={fadeUp} className="divider">
          <div className="divider-line"/>
          <span className="divider-star">✦</span>
          <div className="divider-line"/>
        </motion.div>

        {/* Venue */}
        <motion.div variants={fadeUp} style={{ textAlign:"center" }}>
          <p style={{
            fontFamily:"Raleway, sans-serif", fontSize:"0.55rem", fontWeight:600,
            letterSpacing:"0.3em", textTransform:"uppercase", color:"#7A6450", marginBottom:"0.4rem",
          }}>Venue</p>
          <h3 style={{
            fontFamily:"Cinzel, serif", fontSize:"clamp(1rem,4vw,1.4rem)", fontWeight:600,
            color:"#4A3524", letterSpacing:"0.06em",
          }}>
            {invite.venue.name.toUpperCase()}
          </h3>
          <p style={{
            fontFamily:"Raleway, sans-serif", fontSize:"0.62rem", fontWeight:400,
            letterSpacing:"0.15em", textTransform:"uppercase", color:"#7A6450",
            marginTop:"0.3rem", lineHeight:1.6,
          }}>
            {invite.venue.address}
          </p>
        </motion.div>

        {/* Directions button */}
        <motion.div variants={fadeUp}>
          <a
            href={invite.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="directions-btn"
            style={{
              display:"inline-flex", alignItems:"center", gap:"0.4rem",
              fontFamily:"Raleway, sans-serif", fontSize:"0.65rem", fontWeight:600,
              letterSpacing:"0.2em", textTransform:"uppercase", color:"#4A5A2E",
              border:"1.5px solid #4A5A2E", borderRadius:"999px",
              padding:"0.6rem 1.4rem", textDecoration:"none",
              transition:"all 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#4A5A2E"; (e.currentTarget as HTMLElement).style.color="white"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="#4A5A2E"; }}
          >
            ↗ Directions
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
