import { motion } from "framer-motion";
import { invite } from "../config/invite";

const fadeUp = {
  hidden: { opacity:0, y:24 },
  show: { opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] as const } }
};

export default function VenueMap() {
  return (
    <section style={{
      background:"linear-gradient(180deg, #E2D0B2 0%, #DCC8A5 100%)",
      padding:"5rem 1.5rem",
      display:"flex", flexDirection:"column", alignItems:"center",
    }}>
      <motion.div
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.12 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.2 }}
        style={{
          display:"flex", flexDirection:"column", alignItems:"center",
          gap:"1.5rem", maxWidth:"430px", width:"100%",
        }}
      >
        <motion.div variants={fadeUp} className="divider">
          <div className="divider-line"/><span className="divider-star">✦</span><div className="divider-line"/>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontFamily:"Cinzel, serif", fontSize:"clamp(0.85rem,3.5vw,1.1rem)", fontWeight:500,
          color:"#4A3524", letterSpacing:"0.12em", textTransform:"uppercase",
        }}>
          Venue
        </motion.h2>

        {/* Map card */}
        <motion.div
          variants={fadeUp}
          style={{
            position:"relative", width:"100%", borderRadius:"16px", overflow:"hidden",
            boxShadow:"0 12px 40px rgba(74,53,36,0.2)", border:"1px solid rgba(184,134,47,0.3)",
          }}
        >
          {/* Map iframe */}
          <iframe
            title="Venue Map"
            src={invite.venue.iframeSrc}
            width="100%"
            height="240"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ display:"block", border:"none", filter:"sepia(20%) saturate(0.8)" }}
          />

          {/* Gold pin marker overlay */}
          <div style={{
            position:"absolute", top:"50%", left:"50%",
            transform:"translate(-50%, -100%)",
            pointerEvents:"none",
          }}>
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
              <path d="M14 0C6.27 0 0 6.27 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.27 21.73 0 14 0Z" fill="#B8862F"/>
              <circle cx="14" cy="14" r="6" fill="white"/>
            </svg>
          </div>

          {/* Info overlay card */}
          <div style={{
            position:"absolute", bottom:0, left:0, right:0,
            background:"rgba(251,246,236,0.95)", backdropFilter:"blur(8px)",
            padding:"0.9rem 1rem",
            borderTop:"1px solid rgba(184,134,47,0.3)",
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <div>
              <p style={{ fontFamily:"Cinzel, serif", fontSize:"0.8rem", fontWeight:600, color:"#4A3524" }}>
                {invite.venue.name}
              </p>
              <p style={{ fontFamily:"Raleway, sans-serif", fontSize:"0.55rem", letterSpacing:"0.12em",
                textTransform:"uppercase", color:"#7A6450", marginTop:"0.15rem" }}>
                {invite.venue.address}
              </p>
            </div>
            <a
              href={invite.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="view-location-btn"
              style={{
                display:"inline-block",
                fontFamily:"Raleway, sans-serif", fontSize:"0.55rem", fontWeight:600,
                letterSpacing:"0.15em", textTransform:"uppercase",
                background:"#B8862F", color:"white", borderRadius:"999px",
                padding:"0.45rem 0.9rem", textDecoration:"none",
                whiteSpace:"nowrap", flexShrink:0,
              }}
            >
              View Location
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
